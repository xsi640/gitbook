制作vagrant box

安装系统
root密码： vagrant
用户名：   vagrant
用户密码： vagrant
安装vbox虚拟机增强工具

设置公钥
[root@localhost ~]# mkdir .ssh
[root@localhost ~]# cd .ssh/
[root@localhost .ssh]# wget http://github.com/mitchellh/vagrant/raw/master/keys/vagrant.pub
[root@localhost .ssh]# mv vagrant.pub authorized_keys

更改权限
[root@localhost ~]# groupadd admin
[root@localhost ~]# usermod -G admin vagrant
[root@localhost ~]# chmod 777 /etc/sudoers
[root@localhost ~]# vim /etc/sudoers
 
添加
Defaults env_keep="SSH_AUTH_SOCK"
%admin ALL=NOPASSWD: ALL
 
[root@localhost ~]# chmod 0440 /etc/sudoers
[root@localhost ~]# chmod 700 ~/.ssh
[root@localhost ~]# chmod 600 ~/.ssh/authorized_keys 

打包box文件
vagrant package --base xxxxxxx_131313_313123 --output xxxx.box

将box文件添加镜像
vagrant box add --name centos-docker /path/to/the/box.box