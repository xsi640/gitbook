```
docker run -it --rm -m 128m stress --vm 1 --vm-bytes 400M --vm-hang 0
```

创建一个容器，测试Docker对容器内存的限制。容器系统镜像是ubuntu 14.04.2。运行后，有如下提示
```
WARNING: Your kernel does not support swap limit capabilities, memory limited without swap.
```
容器可以正常运行，并没有因为内存溢出而终结。

https://docs.docker.com/installation/ubuntulinux/

```
Adjust memory and swap accounting
When users run Docker, they may see these messages when working with an image:

WARNING: Your kernel does not support cgroup swap limit. WARNING: Your
kernel does not support swap limit capabilities. Limitation discarded.
To prevent these messages, enable memory and swap accounting on your system. To enable these on system using GNU GRUB (GNU GRand Unified Bootloader), do the following.

Log into Ubuntu as a user with sudo privileges.

Edit the /etc/default/grub file.

Set the GRUB_CMDLINE_LINUX value as follows:

GRUB_CMDLINE_LINUX="cgroup_enable=memory swapaccount=1"
Save and close the file.

Update GRUB.

$ sudo update-grub
Reboot your system.
```