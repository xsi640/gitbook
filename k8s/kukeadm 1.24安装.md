1. 配置hosts
   ```shell
   cat /etc/hosts
   ----
   192.168.1.240 k8s-master
   192.168.1.241 k8s-node1
   192.168.1.242 k8s-node2
   ----
   ```

   

2. 升级系统内核

```shell
所有机器都要升级内核

#查看当前内核版本
uname -r
uname -a
cat /etc/redhat-release 

#添加yum源仓库
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup 
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo 
curl -o /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org
yum install -y https://www.elrepo.org/elrepo-release-7.0-4.el7.elrepo.noarch.rpm

#更新yum源仓库
yum -y update

#查看可用的系统内核包
yum --disablerepo="*" --enablerepo="elrepo-kernel" list available

#安装内核，注意先要查看可用内核，我安装的是5.18版本的内核
yum --enablerepo=elrepo-kernel install kernel-ml -y 

#查看目前可用内核
awk -F\' '$1=="menuentry " {print i++ " : " $2}' /etc/grub2.cfg

#使用序号为0的内核，序号0是前面查出来的可用内核编号
grub2-set-default 0

#生成 grub 配置文件并重启
grub2-mkconfig -o /boot/grub2/grub.cfg
reboot
```

3. 环境配置

```shell
#关闭防火墙，selinux
systemctl stop firewalld
systemctl disable firewalld
sed -i 's/enforcing/disabled/' /etc/selinux/config 
setenforce 0

## 关闭swap

swapoff -a  
sed -ri 's/.*swap.*/#&/' /etc/fstab


#系统优化
cat > /etc/sysctl.d/k8s_better.conf << EOF
net.bridge.bridge-nf-call-iptables=1
net.bridge.bridge-nf-call-ip6tables=1
net.ipv4.ip_forward=1
vm.swappiness=0
vm.overcommit_memory=1
vm.panic_on_oom=0
fs.inotify.max_user_instances=8192
fs.inotify.max_user_watches=1048576
fs.file-max=52706963
fs.nr_open=52706963
net.ipv6.conf.all.disable_ipv6=1
net.netfilter.nf_conntrack_max=2310720
EOF
modprobe br_netfilter
lsmod |grep conntrack
modprobe ip_conntrack
sysctl -p /etc/sysctl.d/k8s_better.conf


#确保每台机器的uuid不一致，如果是克隆机器，修改网卡配置文件删除uuid那一行
cat /sys/class/dmi/id/product_uuid
```

4. 安装ipvs

```shell
###系统依赖包
yum install -y conntrack ntpdate ntp ipvsadm ipset jq iptables curl sysstat libseccomp wget vim net-tools git

### 开启ipvs 转发
modprobe br_netfilter 

cat > /etc/sysconfig/modules/ipvs.modules << EOF 

#!/bin/bash 
modprobe -- ip_vs 
modprobe -- ip_vs_rr 
modprobe -- ip_vs_wrr 
modprobe -- ip_vs_sh 
modprobe -- nf_conntrack
EOF 

chmod 755 /etc/sysconfig/modules/ipvs.modules 

bash /etc/sysconfig/modules/ipvs.modules 

lsmod | grep -e ip_vs -e nf_conntrack
```

5. 安装containerd

```shell
创建 /etc/modules-load.d/containerd.conf 配置文件:

cat << EOF > /etc/modules-load.d/containerd.conf
overlay
br_netfilter
EOF

modprobe overlay
modprobe br_netfilter

获取阿里云YUM源
wget -O /etc/yum.repos.d/docker-ce.repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

查看YUM源中Containerd软件
# yum list | grep containerd
containerd.io.x86_64                        1.4.12-3.1.el7             docker-ce-stable

下载安装：
yum install -y containerd.io

生成containerd的配置文件
mkdir /etc/containerd -p 
生成配置文件
containerd config default > /etc/containerd/config.toml
编辑配置文件
vim /etc/containerd/config.toml
-----
SystemdCgroup = false 改为 SystemdCgroup = true


# sandbox_image = "k8s.gcr.io/pause:3.6"
改为：
sandbox_image = "registry.aliyuncs.com/google_containers/pause:3.6"


------

# systemctl enable containerd
Created symlink from /etc/systemd/system/multi-user.target.wants/containerd.service to /usr/lib/systemd/system/containerd.service.
# systemctl start containerd
```

6. 部署k8s 1.24.x

```shell
1.添加阿里云YUM软件源

cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

yum clean all 
yum makecache fast
```

7. 安装kubeadm，kubelet，kubectl

```shell
yum install -y kubectl kubelet kubeadm
systemctl enable kubelet

为了实现docker使用的cgroupdriver与kubelet使用的cgroup的一致性，建议修改如下文件内容。

# vim /etc/sysconfig/kubelet
KUBELET_EXTRA_ARGS="--cgroup-driver=systemd"

设置kubelet为开机自启动即可，由于没有生成配置文件，集群初始化后自动启动
# systemctl enable kubelet

拉取镜像
kubeadm config images pull --image-repository registry.aliyuncs.com/google_containers --v=5

使用kubeadm init命令初始化

在k8s-master上执行，报错请看k8s报错汇总
 
kubeadm init --kubernetes-version=v1.24.2 \
--pod-network-cidr=10.224.0.0/16 \
--apiserver-advertise-address=192.168.1.240 \
--image-repository registry.aliyuncs.com/google_containers

--apiserver-advertise-address 集群通告地址
--image-repository 由于默认拉取镜像地址k8s.gcr.io国内无法访问，这里指定阿里云镜像仓库地址
--kubernetes-version K8s版本，与上面安装的一致
--service-cidr 集群内部虚拟网络，Pod统一访问入口
--pod-network-cidr Pod网络，，与下面部署的CNI网络组件yaml中保持一致

-----

Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 192.168.1.240:6443 --token ej2t3r.940zeyusgglolfiv \
        --discovery-token-ca-cert-hash sha256:4b819b12b79efc600968d8c773eecd14a237ab9186596ce74320fd88ccfedac5 
----

kubectl get node 
```

8. 部署calico网络

```shell
网络组件有很多种，只需要部署其中一个即可，推荐Calico。

Calico是一个纯三层的数据中心网络方案，Calico支持广泛的平台，包括Kubernetes、OpenStack等。

Calico 在每一个计算节点利用 Linux Kernel 实现了一个高效的虚拟路由器（ vRouter） 来负责数据转发，而每个 vRouter 通过 BGP 协议负责把自己上运行的 workload 的路由信息向整个 Calico 网络内传播。

此外，Calico 项目还实现了 Kubernetes 网络策略，提供ACL功能。

1.下载Calico

wget https://docs.projectcalico.org/manifests/calico.yaml --no-check-certificate

vim +4434 calico.yaml
...
- name: CALICO_IPV4POOL_CIDR
  value: "10.244.0.0/16"
...

kubectl apply -f calico.yaml

# 删除所有节点不可调用的污点
kubectl taint nodes --all node-role.kubernetes.io/control-plane:NoSchedule-
kubectl get pod -n kube-system 
```

9. 其他worker节点加入

   ```shell
   k8s-node1 与 k8s-node2 加入：
   kubeadm join 192.168.1.240:6443 --token ej2t3r.940zeyusgglolfiv \
           --discovery-token-ca-cert-hash 
   ```

10. 部署dashboard 服务

```shell
wget https://raw.githubusercontent.com/cby-chen/Kubernetes/main/yaml/dashboard.yaml
目前最新版本v2.6.0 

vim dashboard.yaml

----
spec:
  ports:
    - port: 443
      targetPort: 8443
      nodePort: 30001
  type: NodePort
  selector:
    k8s-app: kubernetes-dashboard
----


kubectl apply -f dashborad.yaml

创建用户：
wget https://raw.githubusercontent.com/cby-chen/Kubernetes/main/yaml/dashboard-user.yaml
kubectl apply -f dashboard-user.yaml

创建token 
kubectl -n kubernetes-dashboard create token admin-user

https://172.16.10.11:30001
输入token：
----
eyJhbGciOiJSUzI1NiIsImtpZCI6IkJDYmxuR1B0bmFRYUN1Sm53cjM2a2VyZ1gxMFpoM3ZpTDl0aG42dFNSdDQifQ.eyJhdWQiOlsiaHR0cHM6Ly9rdWJlcm5ldGVzLmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiXSwiZXhwIjoxNjU3NDMzNzU1LCJpYXQiOjE2NTc0MzAxNTUsImlzcyI6Imh0dHBzOi8va3ViZXJuZXRlcy5kZWZhdWx0LnN2Yy5jbHVzdGVyLmxvY2FsIiwia3ViZXJuZXRlcy5pbyI6eyJuYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsInNlcnZpY2VhY2NvdW50Ijp7Im5hbWUiOiJhZG1pbi11c2VyIiwidWlkIjoiNDdmNjEzNDYtMTliNS00NjlhLTlkMDktM2JjY2FlMzcyZDNkIn19LCJuYmYiOjE2NTc0MzAxNTUsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlcm5ldGVzLWRhc2hib2FyZDphZG1pbi11c2VyIn0.Mj5tS4CxX6BdZVk7SW9x81gybmlmAKHO-xttuYS5dWwPkZTBYD5jmezXtIv0o4QH0mDKCGgXLOO5EMhr34oVX8H6zMGVVo7NwhVpoTBFsiepdudapV9MJrGJPP-rVPsxifz_ZsLvX-dNa60IcFaGflycdIAxMCdvHicSXD0xhcr3c3MQ2GS4zF2gEKLGGXxhRwH_hwOmDKBI7hxXT5Wuca5sf_r9jXlmgTYZ_QdG4f0d9BZUaJF3vdhM6c92RkiVST97zAX14LzHTgd_RtEMxTDDm3_KzKhwueKSHjcdPsUjSIZbIQVtgqxhSj4DFeRa3af8A96yhxmaTtMA_21Bog
----
```

chrome浏览器因证书问题不能访问，输入thisisunsafe