### 免密码登录

1. 生成密钥
   ssh-keygen -t rsa
2. ssh-copy-id -i ~/.ssh/id_rsa.pub <root>@<romte_ip>

### 修改sftp连接数量

1. 修改/etc/ssh/sshd_config
   
   ```shell
   MaxSessions 1000     #最大连接数
   LoginGraceTime 0     #等待时间
   MaxStartups 10:30:100 #从第10个连接开始以30%的概率（递增）拒绝新连接，直到连接数达到60为止。
   ```
   
   
2. 重启ssh
   
   ```shell
   service sshd restart
   ```
   
   