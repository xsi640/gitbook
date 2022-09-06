查看内存占用最多的40个进程
```
ps auxw|head -1;ps auxw|sort -rn -k4|head -40
```