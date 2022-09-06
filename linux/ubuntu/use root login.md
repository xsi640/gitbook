## 开启root用户ssh登录
修改配置文件: /etc/ssh/sshd_config

找到
```
# Authentication:  
LoginGraceTime 120  
PermitRootLogin prohibit-password  
StrictModes yes
```

更改为
```
# Authentication:  
LoginGraceTime 120  
PermitRootLogin yes  
StrictModes yes
```
重启ssh服务
```
sudo service ssh restart
```

修改root密码
```
sudo passwd root
```