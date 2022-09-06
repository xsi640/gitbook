- 修改系统默认的终端
chsh -s /bin/zsh
chsh -s /bin/bash --系统默认

- 设置status bar
Appearance -> General -> Status bar location : Bottom
Profiles -> Session -> Status bar enabled 勾选， Configure Status Bar

- 设置默认窗口大小
Profiles -> Window -> Settings for New Windows 115 x 25

- 配置颜色
https://draculatheme.com/iterm/
下载.zip包，import: Profiles -> Colors -> Color Pressets -> import && select

- 安装powerline字体
https://github.com/powerline/fonts
```
# clone
git clone https://github.com/powerline/fonts.git --depth=1
# install
cd fonts
./install.sh
# clean-up a bit
cd ..
rm -rf fonts
```

- 安装oh-my-zsh
https://github.com/ohmyzsh/ohmyzsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

- 设置oh-my-zsh
编辑 ~/.zshrc
```
plugins=(
  git
  autojump
  zsh-autosuggestions
  zsh-syntax-highlighting
)
```
    - 安装 zsh-autosuggestion
    git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
    - 安装 zsh-syntax-highlighting
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
    - 安装autojump
    brew install autojump
    在 ~/.zshrc 文件， plugins配置列表结尾处追加
    ```
    [ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh
    ```
    - 修改权限
    ```
     compaudit | xargs chmod g-w,o-w
    ```

- .bash_profile
.zshrc 结尾处增加
source .bash_profile
