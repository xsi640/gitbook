# gitlab-ci

![](D:\develop\github\github-book\java\gitlab-ci.png)

## gitlab-runner 部署

- 拉取镜像
  
  ```shell
  docker pull gitlab/gitlab-runner
  ```
  
  

- 运行gitlab-runner并注册到gitlab
  
  生成config.toml
  
  ```shell
  docker run -it --rm -v /opt/gitlab-runner/myproject-web/config:/etc/gitlab-runner \
    gitlab/gitlab-runner register \
    --non-interactive \
    --executor "docker" \
    --docker-privileged \
    --docker-image 192.168.1.250:8000/ci-jdk8_node14 \
    --url "http://gitlab.suyang.local/" \
    --registration-token "iAezioyLLxCQsZ_UFwJi" \
    --tag-list "my-runner" \
    --run-untagged="true" \
    --locked="false" \
    --add-host 192.168.1.250=gitlab.suyang.local
    --access-level="not_protected";
  ```

- 修改config.toml

```toml
concurrent = 1
check_interval = 0

[session_server]
  session_timeout = 1800

[[runners]]
  name = "787fd9c7acb2"
  url = "http://gitlab.suyang.local/"
  token = "hyJkSZPUBqxW8WRspA4k"
  executor = "docker"
  [runners.custom_build_dir]
  [runners.cache]
    [runners.cache.s3]
    [runners.cache.gcs]
    [runners.cache.azure]
  [runners.docker]
    tls_verify = false
    image = "192.168.1.250:8000/ci-jdk8_node14"
    extra_hosts = ["gitlab.suyang.local:192.168.1.250"]
    privileged = true
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/cache","/var/run/docker.sock:/var/run/docker.sock","/data1/gitlab-runner/my:/root"]
    shm_size = 0
    pull_policy = "if-not-present"
```

- 运行runner
```yaml
docker run \
-d \
--restart=always \
--name gitlab-runner-myproject-web \
-v /etc/localtime:/etc/localtime \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /root/gitlab-runner/myproject-web/config:/etc/gitlab-runner \
--add-host gitlab.suyang.local:192.168.1.250 \
gitlab/gitlab-runner:latest
```

- 编写.gitlab-ci.yml

```yaml
stages:
  - build

build:
  stage: build
  image: 192.168.1.250:8000/ci-jdk:8
  script:
    - chmod 777 ./gradlew
    - ./gradlew clean
    - ./gradlew docker_app
    - ./gradlew shell_app
    - chmod 777 ./build/package/app/run.sh
    - ./build/package/app/run.sh
  only:
    - develop
  tags:
    - myproject
```
