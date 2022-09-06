清理退出的容器
docker rm -v $(docker ps --all --quiet --filter 'status=exited')

清理无用的卷
docker volume rm $(docker volume ls --quiet --filter 'dangling=true')

docker rm --force $(docker images --quiet)

docker network rm $(docker network ls --quiet)

docker-compose down --volumes --rmi all --remove-orphans

docker system prune --all --force --volumes