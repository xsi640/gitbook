# clash+iptables透明代理

1. 修改clash配置文件

   ```yaml
   port: 7890
   socks-port: 7891
   redir-port: 7892
   allow-lan: true
   mode: rule
   log-level: silent
   external-controller: '0.0.0.0:9090'
   external-ui: '/ui'
   dns:
     enable: true
     listen: 0.0.0.0:1053
     enhanced-mode: redir-host
     nameserver:
       - '114.114.114.114'
       - '223.5.5.5'
     fallback:
       - 'tls://1.1.1.1:853'
       - 'tcp://1.1.1.1:53'
       - 'tcp://208.67.222.222:443'
       - 'tls://dns.google'
   ```

   

2. ipset设置白名单规则

   ```shell
   #!/bin/bash
   
   ipset -N china hash:net
   wget -P /root/clash http://www.ipdeny.com/ipblocks/data/countries/cn.zone
   for i in $(cat /root/clash/cn.zone ); do ipset -A china $i; done
   ```

3. 设置iptables转发规则

   ```shell
   #!/bin/bash
   #在nat表中新建一个clash规则链
   iptables -t nat -N CLASH
   #排除环形地址与保留地址，匹配之后直接RETURN
   iptables -t nat -A CLASH -d 0.0.0.0/8 -j RETURN
   iptables -t nat -A CLASH -d 10.0.0.0/8 -j RETURN
   iptables -t nat -A CLASH -d 127.0.0.0/8 -j RETURN
   iptables -t nat -A CLASH -d 169.254.0.0/16 -j RETURN
   iptables -t nat -A CLASH -d 172.16.0.0/12 -j RETURN
   iptables -t nat -A CLASH -d 192.168.0.0/16 -j RETURN
   iptables -t nat -A CLASH -d 224.0.0.0/4 -j RETURN
   iptables -t nat -A CLASH -d 240.0.0.0/4 -j RETURN
   #排除白名单
   iptables -t nat -A CLASH -m set --match-set china src -j RETURN
   
   #重定向tcp流量到本机7892端口
   iptables -t nat -A CLASH -p tcp -j REDIRECT --to-port 7892
   #拦截外部tcp数据并交给clash规则链处理
   iptables -t nat -A PREROUTING -p tcp -j CLASH
   
   #在nat表中新建一个clash_dns规则链
   iptables -t nat -N CLASH_DNS
   #清空clash_dns规则链
   iptables -t nat -F CLASH_DNS
   #重定向udp流量到本机1053端口
   iptables -t nat -A CLASH_DNS -p udp -j REDIRECT --to-port 1053
   #抓取本机产生的53端口流量交给clash_dns规则链处理
   iptables -t nat -I OUTPUT -p udp --dport 53 -j CLASH_DNS
   #拦截外部upd的53端口流量交给clash_dns规则链处理
   iptables -t nat -I PREROUTING -p udp --dport 53 -j CLASH_DNS
   ```

   

4. 删除iptables相关转发规则

```shell
#!/bin/bash
iptables -t nat -D PREROUTING -p tcp -j CLASH
iptables -t nat -D OUTPUT -p udp --dport 53 -j CLASH_DNS
iptables -t nat -D PREROUTING -p udp --dport 53 -j CLASH_DNS
iptables -t nat -F CLASH
iptables -t nat -X CLASH
iptables -t nat -F CLASH
iptables -t nat -X CLASH_DNS
```

