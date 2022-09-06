增加用户：
```
useradd username
```
添加账户并为账户创建home文件夹
```
useradd -d /usr/username -m username
```
为用户增加密码：
```
passwd username
```
新建工作组：
```
groupadd groupname
```
将用户添加进工作组：
```
usermod -G groupname username
```
删除用户：
```
userdel username
```