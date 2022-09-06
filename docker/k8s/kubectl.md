kubectl version
#客户端版本
Client Version: version.Info{Major:"1", Minor:"9", GitVersion:"v1.9.0", GitCommit:"925c127ec6b946659ad0fd596fa959be43f0cc05", GitTreeState:"clean", BuildDate:"2017-12-15T21:07:38Z", GoVersion:"go1.9.2", Compiler:"gc", Platform:"linux/amd64"}
#服务端版本
Server Version: version.Info{Major:"1", Minor:"9", GitVersion:"v1.9.0", GitCommit:"925c127ec6b946659ad0fd596fa959be43f0cc05", GitTreeState:"clean", BuildDate:"2017-12-15T20:55:30Z", GoVersion:"go1.9.2", Compiler:"gc", Platform:"linux/amd64"}

#获取所有节点
kubectl get nodes

#获取所有pods
kubectl get pods

#发布一个容器kubernetes-bootcamp， 指定image， 端口号，
kubectl run kubernetes-bootcamp --image=jocatalin/kubernetes-bootcamp:v1 --port=8080

#获取所有发布
kubectl get deployments
                        期望        当前                    可用
NAME                  DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   1         1         1            0           41s

#获取所有pods，包含节点信息
kubectl get pods -o wide

#删除发布kubernetes-bootcamp
kubectl delete deployments kubernetes-bootcamp

#查看发布 kubernetes-bootcamp
kubectl describe deploy kubernetes-bootcamp

#运行proxy，用于访问pod
kubectl proxy

#curl访问发布的pod curl http://localhost:8001/api/v1/proxy/namespaces/default/pods/[pod名称]
curl http://localhost:8001/api/v1/proxy/namespaces/default/pods/kubernetes-bootcamp-6b7849c495-w5nxh/
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-6b7849c495-w5nxh | v=1

#发布扩容到4个
kubectl scale deploy kubernetes-bootcamp --replicas=4

#查看发布描述
kubectl describe deploy

#修改发布kubernetes-bootcamp的镜像
kubectl set image deploy kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2

#查看滚动更新状态
kubectl rollout status deploy kubernetes-bootcamp

#回退更新
kubectl rollout undo deploy kubernetes-bootcamp

#根据文件创建（这里创建了一个pod）
kubectl create -f nginx-pods.yaml

#访问pod
curl http://localhost:8001/api/v1/proxy/namespaces/default/pods/nginx/

#根据文件创建（这里创建了一个deploy）
kubectl create -f nginx-deployment.yaml

#获取pods（label: app=nginx）
kubectl get pods -l app=nginx

kubectl expose deploy kubernetes-bootcamp --type="NodePort" --target-port=8080 --port=80

kubectl get services
NAME                  TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
kubernetes-bootcamp   NodePort    10.68.32.232   <none>        80:26539/TCP   11s

netstat -ntlp | grep 26539

curl http://192.168.68.101:26539

#容器内，可以正常访问
curl http://cluster-ip:80

#获取services，namespace=kube-system
kubectl -n kube-system get svc

#通过名称解析服务
curl nginx-service:8080

#查看pod日志
kubectl logs kubernetes-bootcamp-74c6f7459-nv74x

#查看service account
kubectl get serviceaccount

#yaml格式查看service account
kubectl get sa -o yaml

#json格式查看service account
kubectl get sa -o json

#发布nginx-pods.xml
kubectl apply -f nginx-pods.yaml


kubectl get pods nginx -o json

wget -qO - 10.68.74.164:8080

#所有节点的标签
kubectl get nodes --show-labels

#syserver节点增加 name=syserver 的标签
kubectl label nodes syserver name=syserver