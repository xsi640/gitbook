### install
1. install docker
2. isntall k3s with docker
curl -sfL https://get.k3s.io | sh -s - --docker
3. add file
"/etc/rancher/k3s/registries.yaml"

mirrors:
  "192.168.1.254:5000":
    endpoint:
            - "http://192.168.1.254:5000"
  "docker.io":
    endpoint:
      - "https://ix32l9fp.mirror.aliyuncs.com"
      - "https://registry-1.docker.io"
configs:
  "192.168.1.254:5000":
    auth:
      username: suyang
      password: 830128suyang
4. copy /etc/rancher/k3s/k3s.yaml to ~/.kube/config
5. vi /etc/systemd/system/k3s.service
# ...
ExecStart=/usr/local/bin/k3s \
    server \
    --kube-apiserver-arg service-node-port-range=1000-32767
6. systemctl daemon-reload and systemctl restart k3s
7. 工作节点安装
/var/lib/rancher/k3s/server/node-token
上面地址找到K3S_TOKEN
curl -sfL https://get.k3s.io | K3S_URL=https://myserver:6443 K3S_TOKEN=XXX sh -
curl -sfL http://rancher-mirror.cnrancher.com/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn sh -
8. 工作节点的roles为none
kubectl label node ${node} node-role.kubernetes.io/worker=worker为节点增加 worker 角色。
9. 修改node name，/etc/systemd/system/k3s-agent.service 增加运行参数 --node-name ${name}


----
树莓派 启动报错
Failed to find memory cgroup, you may need to add \"cgroup_memory=1 cgroup_enable=memory\" to your linux cmdline (/boot/cmdline.txt on a Raspberry Pi)"

$ df -hT | grep mmc
/dev/mmcblk0p2 ext4       29G  2.8G   26G  10% /
/dev/mmcblk0p1 vfat      253M  117M  136M  47% /boot/firmware
# 真正的启动分区在/boot/firmware

# 阅读/boot/firmware/README
# 排查后得知，应该修改nobtcmd.txt
/boot/firmware/nobtcmd.txt添加cgroup相关参数
cat /proc/cmdline | grep cgroup_memory
coherent_pool=1M ………. cgroup_memory=1 cgroup_enable=memory

这时发现k3s依然没有完成启动，日志输出缓慢，怀疑系统某些因素影响了启动过程。排查entropy，发现可用值非常低，低到会阻塞程序运行，一般来说<1000程序就会卡住：
cat /proc/sys/kernel/random/entropy_avail
很多程序的运行都依赖随机数生成，比如hash、加密解密等过程。申请随机数就会消耗系统的entropy（熵），当entropy低到一定阈值，程序就运行缓慢，等待随机数种子。

一般来说kernel可以从硬件运行信息中收集噪声来补充entropy，但树莓派毕竟硬件能力有限，无法从硬件层面快速生成entropy，所以我们安装软件提供模拟算法进行补充：
apt install haveged 
systemctl enable haveged

cat /proc/sys/kernel/random/entropy_avail
2366
一切妥当之后，再查看k3s启动状态，k3s已经完成启动。





