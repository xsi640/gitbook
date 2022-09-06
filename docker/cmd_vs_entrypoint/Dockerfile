FROM centos
ENV name Docker
#ENTRYPOINT echo "hello $name"
#ENTRYPOINT ["/bin/echo", "hello $name"]
#上面的错误，exec不是在shell中执行$name找不到
CMD echo "hello $name"