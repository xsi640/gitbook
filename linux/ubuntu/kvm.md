#### 确认硬件支持虚拟化

执行 `egrep` 命令以验证您的服务器的硬件是否支持虚拟化，

```shell
linuxtechi@kvm-ubuntu18-04:~$ egrep -c '(vmx|svm)' /proc/cpuinfo
1
```

如果输出结果大于 0，就意味着您的硬件支持虚拟化。重启，进入 BIOS 设置中启用 VT 技术。

现在使用下面的命令安装 `kvm-ok` 实用程序，该程序用于确定您的服务器是否能够运行硬件加速的 KVM 虚拟机。

```shell
linuxtechi@kvm-ubuntu18-04:~$ sudo apt install cpu-checker
```

运行 kvm-ok 命令确认输出结果，

```shell
linuxtechi@kvm-ubuntu18-04:~$ sudo kvm-ok
INFO: /dev/kvm exists
KVM acceleration can be used
```

#### 安装kvm以及依赖包

运行下面的 apt 命令安装 KVM 及其依赖项：

```shell
linuxtechi@kvm-ubuntu18-04:~$ sudo apt update
linuxtechi@kvm-ubuntu18-04:~$ sudo apt install qemu qemu-kvm libvirt-bin  bridge-utils  virt-manager
```

只要上图相应的软件包安装成功，那么你的本地用户（对于我来说是 `linuxtechi`）将被自动添加到 `libvirtd` 群组。

```shell
linuxtechi@kvm-ubuntu18-04:~$ sudo service libvirtd start
linuxtechi@kvm-ubuntu18-04:~$ sudo update-rc.d libvirtd enable
```

现在使用下面的命令确认 libvirtd 服务的状态，

```shell
linuxtechi@kvm-ubuntu18-04:~$ service libvirtd status
```

#### 为kvm设置网桥

只有通过桥接网络，KVM 虚拟机才能访问外部的 KVM 管理程序或主机。在Ubuntu 18.04中，网络由 `netplan` 实用程序管理，每当我们新安装一个 Ubuntu 18.04 系统时，会自动创建一个名称为 `/etc/netplan/50-cloud-init.yaml` 文件，其配置了静态 IP 和桥接网络，`netplan` 实用工具将引用这个文件。

修改后内容如下：

```shell
sudo vi /etc/netplan/50-cloud-init.yaml

network:
  version: 2
  ethernets:
    ens33:
      dhcp4: no
      dhcp6: no
  bridges:
    br0:
      interfaces: [ens33]
      dhcp4: no
      addresses: [192.168.0.51/24]
      gateway4: 192.168.0.1
      nameservers:
        addresses: [192.168.0.1]
```

正如你所看到的，我们已经从接口（`ens33`）中删除了 IP 地址，并将该 IP 添加到 `br0` 中，并且还将接口（`ens33`）添加到 `br0`。使用下面的 `netplan`命令使更改生效，

```shell
linuxtechi@kvm-ubuntu18-04:~$ sudo netplan apply
```

现在使用以下方法确认网络桥接状态：

```shell
linuxtechi@kvm-ubuntu18-04:~$ sudo networkctl status -a
```

#### 安装virt-manager虚拟机管理工具

```shell
brew tap jeffreywildman/homebrew-virt-manager
brew install virt-manager virt-viewer
```

https://github.com/jeffreywildman/homebrew-virt-manager

ssh免登陆

生成密钥(机子上有可以忽略)

```shell
ssh-keygen -t rsa
```

将公钥传到kvm服务器

```shell
ssh-copy-id -i ~/.ssh/id_rsa.pub root@192.168.1.254
```

连接kvm host。

```
virt-manager -c 'qemu+ssh://root@192.168.1.254/system?socket=/var/run/libvirt/libvirt-sock'
```

- 安装系统时iso可手动输入

虚拟机xml文件位置
/etc/libvirt/qemu

建立filesystem直通
```
<filesystem type='mount' accessmode='passthrough'>
 <source dir='/mnt/disk1'/>
 <target dir='disk1'/>
</filesystem>
```

```
cat >>/etc/modules <<EOF
loop
virtio
9p
9pnet
9pnet_virtio
EOF
```

```
service kmod start
```

```
mount disk1 /mnt/disk1 -t 9p -o trans=virtio,version=9p2000.L,nobootwait,rw,_netdev
mount data /opt/data -t 9p -o trans=virtio,version=9p2000.L,nobootwait,rw,_netdev
```