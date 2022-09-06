Create a file at /etc/systemd/system/docker.service.d/startup_options.conf 
ubuntu at /lib/systemd/system/docker.service
with the below contents:
```
# /etc/systemd/system/docker.service.d/override.conf
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd -H fd:// -H tcp://0.0.0.0:2376
```
Reload the unit files:
```
$ sudo systemctl daemon-reload
```
Restart the docker daemon with new startup options:
```
$ sudo systemctl restart docker.service
```

how to use
```
export DOCKER_HOST="tcp://{ip}:2376"
```