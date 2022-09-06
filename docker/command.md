build docker image

```shell
docker build -t xsi640/hello-world .
```



view docker history layer

```shell
docker history 741dfa7f3dbf
```



run docker image

```shell
docker run xsi640/hello-world
```



删除退出的容器

```shell
docker rm $(docker ps -a | grep Exited | awk '{print $1}')
```



运行容器，运行bash

```shell
docker run -it suyang/centos-entrypoint-shell bash
```



Dockerfile
RUN  *执行命令并创建新的Image layer*
CMD *设置容器启动后默认值醒的命令和参数；如果docker run制定了其他命令，CMD被忽略；如果有多个CMD，只会执行最后一行*
ENTRYPOINT *容器启动时运行的命令，以服务运行，不会忽略*

shell格式

```dockerfile
RUN apt-get install -y vim
```

exec格式

```dockerfile
RUN ["apt-get", "install", "-y", "vim"]
```

ENTRYPOINT 最佳实践

```dockerfile
先COPY，后ENTRYPOINT运行
```



run docker私有仓库

```shell
docker run -d -p 5000:5000 --restart always --name registry registry:2
```



访问docker registry的主机

/etc/docker/daemon.json 增加下面内容

```
"insecure-registries": ["192.168.68.102:5000"]
```



重启docker

```shell
service docker restart
```



push image

```shell
docker push 192.168.68.102:5000/hello-world
```



查看docker registry内的image

```shell
curl http://192.168.68.102:5000/v2/_catalog
```

```
{"repositories":["hello-world"]}
```

```shell
docker run -it 366246d6a7d1 /bin/bash
```



-d 后台执行

```shell
docker run -d xsi640/flask-demo
```

查看docker容器检查

```shell
docker inspect {container id}
```

docker删除none镜像
```
docker images|grep none|awk '{print $3 }'|xargs docker rmi
```