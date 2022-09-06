git init //初始化git仓库
git status //查看当前状态
git add xxxx.md //将文件xxxx.md添加到git仓库
git rm --cached xxxx.md //将文件xxxx.md从本地git仓库删除
git commit readme.txt -m 'first commit 1'   //提交reamde.txt到本地仓库
git remote add origin https://gitee.com/xsi640/test.git //添加远成仓库地址http://
git push --set-upstream origin master   //提交
git clone https://gitee.com/xsi640/test.git //克隆远程仓库
git add -A  //提交所有修改到本地仓库
git push    //提交所有修改到远程仓库
git pull    //下拉远程修改
git commit -am 'xxxx'   //提交所有
git log     //查看日志，提交记录

git branch  //查看分支
git branch -avv
git checkout xxxx   //切换分支

git branch dev //基于当前分支创建一个新分支
git branch test origin/master //基于远程分支创建一个分支
git branch bfc 1ceb1232e0f037fdf40d1ff38fb2b84a03ceb21a //基于一个提交创建一个分支
基于一个Tag创建一个分支

git branch -d test2 //删除分支