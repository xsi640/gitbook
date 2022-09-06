## 使用kubectx 管理多集群
首先配置多个~/.kube/config
```
export PATH=$PATH:/Users/suyang/tools/k8s/kubectx
export KUBECONFIG=$KUBECONFIG:$HOME/.kube/config.ekb-dev:$HOME/.kube/config.ekb-beta
```
kubectx # 列出所有集群
kubectx [name] # 切换到name集群

## 使用kubens 切换namespace
kubens # 列出所有namespace
kubens [name] # 切换到name namespace