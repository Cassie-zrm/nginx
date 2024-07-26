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

## 配置 https

1. 生成私钥

```sh
openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048
```

2. 生成证书请求文件 CSR

```sh
openssl req -new -key private.key -out csr.csr
```

3. 通过 csr 生成证书

```sh
openssl x509 -req -in csr.csr -signkey private.key -out certificate.crt
```

## 缓存技术

```conf
proxy_cache_path [绝对路径] [levels=缓存的目录结构] [use_temp_path=on|off] keys_zone=name:size [inactive=time] [max_size=size] [min_free=size] [manager_files=number] [manager_sleep=time] [manager_threshold=time] [loader_files=number] [loader_sleep=time] [loader_threshold=time] [purger=on|off] [purger_files=number] [purger_sleep=time] [purger_threshold=time]
```

| 变量                       | 说明                                                                                                                                                                 |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| $arg\__name_               | 表示请求行中的任意参数，_name_ 为参数名称                                                                                                                            |
| $args                      | 表示请求行中的参数部分                                                                                                                                               |
| $binary_remote_addr        | 二进制形式表示的客户端地址                                                                                                                                           |
| $body_bytes_sent           | 发送到客户端的字节数，不包括响应头                                                                                                                                   |
| $bytes_received            | 接受到客户端的字节数                                                                                                                                                 |
| $bytes_sent                | 发送到客户端的字节数                                                                                                                                                 |
| $connection                | 连接序列号                                                                                                                                                           |
| $connection_requests       | 当前连接的请求数量                                                                                                                                                   |
| $connection_time           | 连接时间，单位为：ms                                                                                                                                                 |
| $cookie\__name_            | 表示任意 cookie，_name_ 为 cookie 名称                                                                                                                               |
| $date_gmt                  | GMT 时间                                                                                                                                                             |
| $date_local                | 本地时间                                                                                                                                                             |
| $host                      | 按照以下顺序获取主机信息：请求行中的主机名，或“Host”请求头字段中的主机名，或与请求匹配的服务器名。                                                                   |
| $hostname                  | 主机名                                                                                                                                                               |
| $http\__name_              | 表示任意请求头；_name_ 为请求头名称，其中破折号被下划线替换并转换为小写；如：$http_user_agent，$http_x_forwarded_for                                                 |
| $proxy_add_x_forwarded_for | 将 $remote_addr 的值附加到“X−Forwarded−For”客户端请求头中，由逗号分隔。如果客户端请求头中不存在“X−Forwarded−For”，则 $proxy_add_x_forwarded_for 等于 $remote_addr 。 |
| $proxy_host                | 代理服务器的地址和端口                                                                                                                                               |
| $proxy_port                | 代理服务器的端口                                                                                                                                                     |
| $query_string              | 同 $args                                                                                                                                                             |
| $remote_addr               | 客户端地址                                                                                                                                                           |
| $remote_port               | 客户端端口                                                                                                                                                           |
| $remote_user               | Basic 身份验证中提供的用户名                                                                                                                                         |
| $request                   | 完整请求行                                                                                                                                                           |
| $request_body              | 请求体                                                                                                                                                               |
| $request_body_file         | 保存请求体的临时文件                                                                                                                                                 |
| $request_length            | 请求长度（包括请求行、头部和请求体）                                                                                                                                 |
| $request_method            | 请求方法                                                                                                                                                             |
| $request_time              | 请求处理时间，单位为：ms                                                                                                                                             |
| $request_uri               | 完整请求行                                                                                                                                                           |
| $scheme                    | 请求协议，http 或 https                                                                                                                                              |
| $server_addr               | 接受请求的服务器地址                                                                                                                                                 |
| $server_name               | 接受请求的服务器名称                                                                                                                                                 |
| $server_port               | 接受请求的服务器端口                                                                                                                                                 |
| $server_protocol           | 请求协议，通常为 HTTP/1.0、HTTP/1.1 或 HTTP/2.0                                                                                                                      |
| $ssl_cipher                | 建立 SSL 连接所使用的加密套件名称                                                                                                                                    |
| $ssl_ciphers               | 客户端支持的加密套件列表                                                                                                                                             |
| $ssl_client_escaped_cert   | 客户端 PEM 格式的证书                                                                                                                                                |
| $ssl_protocol              | 建立 SSL 连接的协议                                                                                                                                                  |
| $status                    | 响应状态码                                                                                                                                                           |
| $time_iso8601              | ISO 8601 标准格式的本地时间                                                                                                                                          |
| $time_local                | Common Log 格式的本地时间                                                                                                                                            |
| $upstream_addr             | upstream 服务器的 ip 和端口                                                                                                                                          |
| $upstream_bytes_received   | 从 upstream 服务器接收的字节数                                                                                                                                       |
| $upstream_bytes_sent       | 发送给 upstream 服务器的字节数                                                                                                                                       |
| $upstream*http*_name_      | 表示 upstream 服务器任意响应头，_name_ 为响应头名称，其中破折号被下划线替换并转换为小写                                                                              |
| $upstream_response_length  | upstream 服务器的响应长度，单位为：字节                                                                                                                              |
| $upstream_response_time    | upstream 服务器的响应时间，单位为：秒                                                                                                                                |
| $upstream_status           | upstream 服务器的响应状态码                                                                                                                                          |
| $uri                       | 请求 uri                                                                                                                                                             |
