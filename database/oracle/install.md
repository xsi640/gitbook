# 安装oracle11g（docker）

拉取镜像

```text
docker pull registry.cn-hangzhou.aliyuncs.com/helowin/oracle_11g
```

启动容器

```text
docker run -d --name oraclellg -p 1521:1521 --privileged=true -v /opt/oracle/oradata:/home/oracle/app/oracle/oradata -v /opt/oracle/flash_recovery_area/helowin:/home/oracle/app/oracle/flash_recovery_area/helowin registry.cn-hangzhou.aliyuncs.com/helowin/oracle_11g
```

进入容器

```text
docker exec -it oracle11g bash
```

修改环境变量

```text
[oracle@39721ba8b1dd /]$ source /home/oracle/.bash_profile
[oracle@39721ba8b1dd /]$ su root 
Password: 
#密码：helowin
[root@39721ba8b1dd /]# vi /etc/profile
#在末尾添加
export ORACLE_HOME=/home/oracle/app/oracle/product/11.2.0/dbhome_2
export ORACLE_SID=helowin
export PATH=$ORACLE_HOME/bin:$PATH
#刷新配置
[root@39721ba8b1dd /]# source /etc/profile
[root@39721ba8b1dd /]# su oracle
```

登录

```text
[oracle@39721ba8b1dd /]$ sqlplus /nolog

SQL*Plus: Release 11.2.0.1.0 Production on Wed Nov 4 00:32:15 2020

Copyright (c) 1982, 2009, Oracle.  All rights reserved.

SQL> connect /as sysdba
Connected.
SQL> 
```

修改默认用户名、密码

```text
SQL> alter user system identified by system;

User altered.

SQL> alter user sys identified by sys;

User altered.

SQL> ALTER PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME UNLIMITED;

Profile altered.

SQL>
```

创建表空间

```text
SQL> create tablespace test datafile '/home/oracle/app/oracle/oradata/helowin/test.dbf' size 500M autoextend on next 50M maxsize unlimited;

Tablespace created.
```

创建用户并指定表空间，授权

```text
SQL> create user summer IDENTIFIED BY 123456 default tablespace test;

User created.

SQL> grant connect,resource,dba to summer;

Grant succeeded.

SQL>
```


| 名称 | 参数     |
| ---- | -------- |
| IP   | 宿主机ip |
| 端口 | 1521     |
| SID  | helowin  |
| 账号 | summer   |
| 密码 | 123456   |
