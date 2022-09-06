## 登录界面多了个其他
在安装一些软件时会自动启用root账户，但是在安装完成后没有关闭root账户，这样就造成系统以为用户要使用root账户，所以在登录界面出现了一个"其他"账户，解决如下
```
sudo defaults write /Library/Preferences/com.apple.loginwindow SHOWOTHERUSERS_MANAGED -bool FALSE
```