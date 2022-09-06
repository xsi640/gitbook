1. install
apt-get install lsyncd
2. 配置
/etc/lsyncd/lsyncd.conf.lua

settings {
    logfile     = "/var/log/lsyncd/lsyncd.log",
    statusFile  = "/var/log/lsyncd/lsyncd.status",
    inotifyMode = "CloseWrite",
    nodaemon    = false,
    maxProcesses= 4,
}
sync {
    default.rsync,
    source      = "/mnt/disk2/document",
    target      = "/mnt/backup/document"
}
sync {
    default.rsync,
    source      = "/mnt/disk2/photo",
    target      = "/mnt/backup/photo"
}

3. 开启运行
systemctl enable lsyncd