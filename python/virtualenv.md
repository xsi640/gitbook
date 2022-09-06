### 安装
pip install virtualenv

### 创建virtualenv虚拟环境
virtualenv venv

### 进入virtualenv虚拟环境
source venv/bin/activate

### 将项目依赖写入 requirements.txt
pip freeze > requirements.txt

### 安装requirements.txt中的依赖
pip install -r requirements.txt

### 退出虚拟环境
deactivate