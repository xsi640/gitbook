## 常用命令
安装virtualenv
```
pip3 install virtualenv
```

建立virtualenv环境
```
virtualenv --no-site-packages venv
```

进入venv环境
```
source venv/bin/activate
```
退出venv环境
```
deactivate
```

将包依赖信息保存在requirements.txt文件中
```
pip freeze > requirements.txt
```
pip就会自动从网上下载并安装所有包。
```
pip install -r requirements.txt 
```

## 使用国内源
新版ubuntu要求使用https源，要注意。
清华：https://pypi.tuna.tsinghua.edu.cn/simple
阿里云：http://mirrors.aliyun.com/pypi/simple/
中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/
华中理工大学：http://pypi.hustunique.com/
山东理工大学：http://pypi.sdutlinux.org/ 
豆瓣：http://pypi.douban.com/simple/

修改 ~/.pip/pip.conf
```
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host=mirrors.aliyun.com
```

安装的时候
```
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pyspider
```