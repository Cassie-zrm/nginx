# nginx

nginx 是一个 web 服务器 可以部署网站 反向代理 集群服务器 网关层  
Apache  
Tomcat  
node express

## nginx 命令

1. 启动
   ./nginx

2. 快速关闭 `nginx -s stop` 比如现在有个接口还在访问，他就直接关闭服务，不会等待。

3. 平稳关闭 `nginx -s quit` 比如现在有个接口还在访问，会等待，再关闭服务。

4. 重载配置文件 `nginx -s reload`

5. 检查配置文件是否出错 `nginx -t`

## 负载均衡

1. 默认是轮询的方式
2. 权重分配 `weight -s` 数值越大负责越多 `server 127.0.0.1:3000 weight=3;`
3. 灾备技术 `backup` 目标服务器会作为备用服务器去使用

配置

```conf
   upstream [cassie] {
      server 127.0.0.1:3000;
      server 127.0.0.1:3001;
      server 127.0.0.1:3002;
   }

```

```conf
用法： proxy_pass http://[负载均衡的地址];
```

## 内置变量

都是$开头的，都是内置变量  
$binary_remote_addr 远程客户端的 ip 地址
