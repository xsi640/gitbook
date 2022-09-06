## 修改dns
# vi /etc/resolvconf/resolv.conf.d/base
```
nameserver 114.114.114.114
```

修改生效
```
resolvconf -u
```


`network:
  version: 2
  renderer: NetworkManager
  ethernets:
    eno1:   # 网卡名称
      dhcp4: no     # 关闭dhcp
      dhcp6: no
      addresses: [192.168.1.38/24]  # 静态ip
      gateway4: 192.168.1.1     # 网关
      nameservers:
        addresses: [8.8.8.8, 114.114.114.114]`# dns


sudo netplan apply