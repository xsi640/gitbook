## 备份原来的源文件
首先，进入源文件 sources.list 所在的目录：
```shell
cd /etc/apt/
```
对源文件进行备份，以防万一
```shell
sudo cp sources.list sources.list.bak
```
修改源文件内容，编辑源文件
```shell
sudo vi sources.list
```
复制如下内容到源文件

```shell
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
```

## 更新源和软件
更新获取 阿里云软件源 提供的软件列表
```shell
sudo apt-get update
```
## 更新软件
```shell
sudo apt-get upgrade
```

## arm64请使用华为的源
wget -O /etc/apt/sources.list https://repo.huaweicloud.com/repository/conf/Ubuntu-Ports-bionic.list
apt-get update