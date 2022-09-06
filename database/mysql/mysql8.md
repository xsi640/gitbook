1. 时区问题

数据库显示的时区和查询出的时区可能不一致
显示数据库默认时区：
show variables like '%time_zone%'; 
在my.cnf添加
[mysqld]
// 设置默认时区
default-time_zone='+8:00'

修改数据库连接字符串 serverTimezone=Asia/Shanghai

关闭ssl
useSSL=false

默认使用native认证
default_authentication_plugin=mysql_native_password