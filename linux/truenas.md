# 安装后

1. 设置ip地址

2. 设置网关、dns、时区

3. 设置ntp服务器

   ntp.ntsc.ac.cn

   ntp1.aliyun.com

   ntp.tencent.com

# 共享SMB

1. 创建Dataset

2. 创建本地用户

   默认所有本地用户都是内置的smb组的成员，被称为内置用户。

   您可以使用该组向服务器上的所有本地用户授予访问权限，或添加更多组调整用户的权限。

   您无法使用 TrueNAS 内置的用户帐户或没有 smb 标志的用户帐户访问 SMB 共享。

3. 调整Dataset ACL

   创建数据集和帐户后，您可以调整访问的权限 ，达成和您的ACL配置匹配。 

   转到存储，打开新数据集的选项，然后单击编辑权限。 许多家庭用户通常会添加一个新条目，该条目将 FULL_CONTROL 授予 builtin_users 组，并将标志设置为 INHERIT。 有关更多详细信息，请参阅权限文章。

4. 创建SMB共享

   分享 -> Windows Shares (SMB) 并点击 Add



- https://www.truenas.com/docs/scale/scaletutorials/shares/
- https://www.truenas.com/docs/scale/scaleuireference/storage/pools/permissionsscale/
