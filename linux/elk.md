## elk单节点部署

### elastic部署
1. 准备elasticsearch.yml
```yaml
cluster.name: "docker-cluster"
network.host: 0.0.0.0
xpack.security.enabled: true
discovery.type: single-node
```
2. docker run
```shell
docker run --name es -d \
--restart=always \
-p 9200:9200 \
-p 9300:9300 \
-e "ES_JAVA_OPTS=-Xms1024m -Xmx1024m" \
-e "discovery.type=single-node" \
-v /es/data:/usr/share/elasticsearch/data \
-v /es/plugins:/usr/share/elasticsearch/plugins \
-v /es/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
--privileged --network es \
elasticsearch:8.5.3
```
3. 进入容器
`docker exec -it es bash`

4. 修改默认密码
`elasticsearch-setup-passwords interactive`

5. 访问es，看是否连接成功

### kibina 部署
1. 准备config/kibana.yml
```yaml
server.name: "kibana"
server.host: 0.0.0.0
server.port: 5601
elasticsearch.username: kibana_system
elasticsearch.password: password
elasticsearch.hosts: ["http://es:9200"]
monitoring.ui.container.elasticsearch.enabled: true
```

2. docker run
```shell
docker run -d --name kibana \
--restart=always \
-v /kibana/config/kibana.yml:/usr/share/kibana/config/kibana.yml \
-v /kibana/data:/usr/share/kibana/data \
-v /kibana/plugins:/usr/share/kibana/plugins \
--network es \
-p 5601:5601 \
-e "ELASTICSEARCH_URL=http://es:9200" \
kibana:8.5.3
```

### filebeat 部署
1. 准备filebeat.docker.yml
```yaml
filebeat.config:
  modules:
    path: ${path.config}/modules.d/*.yml
    reload.enabled: false

filebeat.autodiscover:
  providers:
    - type: docker
      hints.enabled: true
      templates:
        - condition:
            contains:
              docker.container.name: filebeat

output.elasticsearch:
  hosts: '${ELASTICSEARCH_HOSTS:elasticsearch:9200}'
  username: '${ELASTICSEARCH_USERNAME:}'
  password: '${ELASTICSEARCH_PASSWORD:}'
  index: 'filebeat-%{+yyyy.MM.dd}'

setup.template.name: 'filebeat'
setup.template.pattern: 'filebeat-*'
setup.template.enabled: false
setup.template.overwrite: true
```

2. 安装kibana


2. 安装filebeat
```shell
docker run \
--network es \
docker.elastic.co/beats/filebeat:8.5.3 \
setup -E setup.kibana.host=kibana:5601 \
-E output.elasticsearch.hosts=["es:9200"] \
-E output.elasticsearch.username="elastic" \
-E output.elasticsearch.password="password" 
```
