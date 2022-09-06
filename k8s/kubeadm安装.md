关闭交换分区
sudo vi /etc/fstab
/swap.img       none    swap    sw      0       0

安装docker，略

安装kubeadm工具

sudo apt-get update && sudo apt-get install -y apt-transport-https curl
sudo curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -

sudo tee /etc/apt/sources.list.d/kubernetes.list <<-'EOF'
deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main
EOF

sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl

拉取所需镜像
kubeadm config images list

k8s.gcr.io/kube-apiserver:v1.16.2
k8s.gcr.io/kube-controller-manager:v1.16.2
k8s.gcr.io/kube-scheduler:v1.16.2
k8s.gcr.io/kube-proxy:v1.16.2
k8s.gcr.io/pause:3.1
k8s.gcr.io/etcd:3.3.15-0
k8s.gcr.io/coredns:1.6.2

sudo docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver:v1.16.2
sudo docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-controller-manager:v1.16.2
sudo docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-scheduler:v1.16.2
sudo docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.16.2
sudo docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.1
sudo docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/etcd:3.3.15-0
sudo docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:1.6.2

sudo docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver:v1.16.2 k8s.gcr.io/kube-apiserver:v1.16.2
sudo docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kube-controller-manager:v1.16.2 k8s.gcr.io/kube-controller-manager:v1.16.2
sudo docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kube-scheduler:v1.16.2 k8s.gcr.io/kube-scheduler:v1.16.2
sudo docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.16.2 k8s.gcr.io/kube-proxy:v1.16.2
sudo docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.1 k8s.gcr.io/pause:3.1
sudo docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/etcd:3.3.15-0 k8s.gcr.io/etcd:3.3.15-0
sudo docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:1.6.2 k8s.gcr.io/coredns:1.6.2

工作节点
sudo docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.15.0
sudo docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.1

sudo docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.15.0 k8s.gcr.io/kube-proxy:v1.15.0
sudo docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.1 k8s.gcr.io/pause:3.1


初始化
sudo kubeadm init \
--apiserver-advertise-address=192.168.1.240 \
--pod-network-cidr=10.244.0.0/16 \
--service-cidr=10.1.0.0/16 \
--image-repository registry.aliyuncs.com/google_containers

kubeadm init --apiserver-advertise-address=192.168.0.111 --image-repository registry.aliyuncs.com/google_containers --service-cidr=10.1.0.0/16 --pod-network-cidr=10.244.0.0/16

mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

安装calico
kubectl apply -f https://docs.projectcalico.org/v3.7/manifests/calico.yaml

watch kubectl get pods --all-namespaces

允许使用master节点部署pod
kubectl taint nodes --all node-role.kubernetes.io/master-

node/<your-hostname> untainted

添加工作节点
主节点生成token
kubeadm token generate
查看token
kubeadm token list
查看ca证书sha
openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | openssl dgst -sha256 -hex | sed 's/^.* //'

工作节点加入集群
kubeadm join --token <token> <master-ip>:<master-port> --discovery-token-ca-cert-hash sha256:<hash>

sudo kubeadm join 192.168.61.100:6443 --token xjykhu.q607ke0110cm6f9y \
    --discovery-token-ca-cert-hash sha256:f80f60e8942cffa0a75d3fbb7ad557387dc3835302440d654d4adc914d70eefd

kubeadm join --token qxqhlm.ps8alxam5qy6nrl5 192.168.1.200:6443 --discovery-token-ca-cert-hash sha256:361c9989341673b83c42aed50babe7b72ef9bdaf93667c9c06c3a2878ea11cc3

安装dashboard ui
https://github.com/kubernetes/dashboard/wiki/Installation

下载yaml
https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml
修改image
k8s.gcr.io/kubernetes-dashboard-amd64:v1.10.1
to
registry.cn-hangzhou.aliyuncs.com/google_containers/kubernetes-dashboard-amd64:v1.10.1

要让dashboard运行在master节点
kubectl label node k8s-master dashboard=true
修改
tolerations:
 - key: node-role.kubernetes.io/master
effect: NoSchedule
nodeSelector:
dashboard: "true"

设置nodeport
kubectl -n kube-system edit service kubernetes-dashboard
# 编辑内容如下：
  ports:
  - nodePort: 32576
    port: 443
    protocol: TCP
    targetPort: 8443
    type: NodePort

配置admin
vim kubernetes-dashboard-admin.yaml
---
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard-admin
  namespace: kube-system

---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: kubernetes-dashboard-admin
  labels:
    k8s-app: kubernetes-dashboard
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: kubernetes-dashboard-admin
  namespace: kube-system
复制代码之后：kubectl create -f kubernetes-dashboard-admin.yml

Kubeconfig登录
注：auth 模式不推荐使用
创建 admin 用户
file: admin-role.yaml
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: admin
  annotations:
    rbac.authorization.kubernetes.io/autoupdate: "true"
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
subjects:
- kind: ServiceAccount
  name: admin
  namespace: kube-system
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin
  namespace: kube-system
  labels:
    kubernetes.io/cluster-service: "true"
    addonmanager.kubernetes.io/mode: Reconcile
复制代码kubectl create -f admin-role.yaml
获取token
kubectl -n kube-system get secret|grep admin-token
->  admin-token-tdvfz  kubernetes.io/service-account-token   3         5s

kubectl -n kube-system describe secret admin-token-tdvfz

Token登录
获取token:
kubectl -n kube-system describe $(kubectl -n kube-system get secret -n kube-system -o name | grep namespace) | grep token
复制代码获取admin-token:
kubectl -n kube-system describe secret/$(kubectl -n kube-system get secret | grep kubernetes-dashboard-admin | awk '{print $1}') | grep token

nodeport端口限制
vi /etc/kubernetes/manifests/kube-apiserver.yaml
--service-node-port-range=1-65535



-------
virutalbox nat方式calico不能正常使用
使用flannel cni网络插件
kubeadm init --pod-network-cidr=10.244.0.0/16 --apiserver-advertise-address=192.168.61.100

kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/a70459be0084506e4ec919aa1c114638878db11b/Documentation/kube-flannel.yml



------
升级
kubeadm reset
docker images -qa|xargs docker rmi -f
sudo apt-get update
sudo apt-get upgrade kubelet kubeadm kubectl