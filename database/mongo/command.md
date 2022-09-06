### 创建数据库
授权
use admin;
db.auth("admin","123123");

建库
use tablename;
db.createUser({user:'admin',pwd:'123123', roles:[{role:'dbOwner', db:'yapi'}]});

退出
quit()


## 添加管理员
use admin
 
db.createUser({user: "admin",pwd: "123123",roles: [{ role: "userAdminAnyDatabase", db: "admin" }]})