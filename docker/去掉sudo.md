去掉sudo
添加一个组docker
sudo groupadd docker

添加当前用户到docker组
sudo usermod -aG docker $USER

重新登录
