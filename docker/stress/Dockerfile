FROM ubuntu
RUN apt-get update && apt-get install -y stress
ENTRYPOINT ["/usr/bin/stress"]
CMD []
#运行docker容器时，后面跟的参数 == 运行stress后面的参数