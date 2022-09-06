vi /etc/docker/daemon.json #没有目录自己创建
　　
{ "insecure-registries":["bxy-registry:5000"] }

systemctl daemon-reload
systemctl restart docker