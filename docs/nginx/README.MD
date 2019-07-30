# nginx入门

## 启用、停止、重载配置

运行可执行文件就可以开启ngInx,比如

```
nginx -c /user/local/nginx/conf/nginx.conf
```

如果nginx已经开启，那么它就可以通过使用-s参数的可执行命令控制。使用下列格式:
```
nginx -s signal
```

signal可以时一下命令之一
 - stop 直接关闭nginx
 - quit 会在处理完当前的请求之后退出，也可以叫优雅的关闭
 - reload 重新加载配置文件，相当于重启
 - reopen 重新打开日志文件

如果重载配置文件的命令没有传递给nginx或者nginx没有重启，那么配置文件的改动是不会被使用的。重置配置文件的命令可以使用：
```
nginx -s reload
```

## 配置文件的结构

nginx是由一些模块组成，我们一般在配置文件中使用一些具体的指令来控制它们。指令被分为简单指令和块级指令。一个简单的指令是由名字和参数组成的，中间用空格分开
并且以分号结尾。

```
root /data/www;
```

块级指令和简单指令一样有类似的结构，但是末尾不是用分号结束。块级指令是通过{}包裹的。如果一个块级指令的大括号里面有其它指令，则它被叫做上下文(比如:*events*,*http*,*server*和*location*)

在配置文件当中，没有放在任何上下文中的指令都是处于主上下文中。**event**和**http**是放在主上下文当中的，**server**放在http中，**location**放在server中

以#开头的会被当做注释处理

通常配置文件当中会有多个server指令。这些server指令会监听不同的端口和服务器名。一旦nginx决定哪个服务器进程处理请求，它会根据在server指令块中定义好的location指令的参数，来匹配请求头中指定的URI。

age:
```
location / {
  root /data/www
}

location /image/ {
  root /data/image/
}

当nginx决定使用哪个server处理得到的URI的时候，会使用当前server当中的location来匹配对应的URI路径，如果匹配成功则会从对应的root下的目录中返回对应的文件
如果文件不存在则返回404，如果有多个location匹配到同一个路径那么只会返回路径名最长的那个。
```

### include指令

作用:相当于是引入一个外部的配置文件到当前位置

在nginx的配置文件中，include可以出现在任何地方，以便增强配置文件的可读性，使得部分配置文件可以重新使用。

使用include包含的文件，必须确保包含的文件自身有正确的Nginx语法，即指令和块，然后指定这些文件的路径(没有给全路径的情况下，Nginx会基于它的主配置文件路径进行搜索)。如:

```
include mime.types 即引入该目录下的配置文件 --- /user/local/nginx/conf/mime.types
```

如果路径中出现通配符，表示可配置多个文件。

```
include server/*.conf
```
nginx将会配置server目录下符合.conf结束的配置文件

### server指令
由关键字server开始的部分被称为虚拟服务部分，包含在Http部分中，用于响应Http请求。一个虚拟服务器由listen和server_name指令组合定义

listen指令定义了一个IP地址/端口组合或者是UNIX套接字路径。listen还有其他的一些可选参数比如default_server、ssl、http2等等。
```
listen address[port]
listen port
listen uninx:path
```
server_name指令默认值为''，意味着没有server_name指令时，对于没有设置host头的请求将会匹配该server。

### location指令

location指令可以用在server部分，提供来自客户端的URI或者内部重定向访问，也可以被嵌套使用

location定义:
```
location [modifier] uri{...}
```
修饰符及其含义

- = 使用精确匹配并且会终止搜索
- ^~ 表示uri以某个常规字符串开头，理解为匹配url路径即可。它并非正则表达式匹配，目的是优于正则表达式匹配。
- ~ 区分大小写的正则表达式
- ~* 不区分大小写的正则表达式

修饰符匹配的优先级
1. =
2. ^=
3. ~

### root指令
设置根目录 一般在location当中使用

### index指令
设置默认页  一般也在location当中使用
### vaild_referers指令
用来校验http请求头中的referer是否有效
```
location ~* \.(gif|jpg|png)$ {
  valid_referers none blocked server_names; //匹配请求头当中的referer的匹配条件
  if ($invalid_referer) { 如果满足上述条件之一则$invalid_referer返回0，不满足则返回1
    return 403;
  }
}
```

### try_files指令
try_files指令可以用在server部分，不过最常见的还是用在location部分，它会按照给定的参数顺序进行尝试，第一个被匹配到的将会被使用。

它的语法如下:
```
try_files file ... uri;
try_files file ... =code;
```

try_files指令可能会通过'/'来检验文件是否存在，如'$uri/'。如果没有找到文件，会进行内部重定向到最后一个参数，最后一个参数可以是命名的location或者是http
状态码。

它经常被用于从一个变量去匹配一个可能的文件，然后将处理传递到一个命名location，如下
```
location / {
  try_files $uri $uri/ @mongrel;
}

location @mongrel {
  proxy_pass http://server;
}
```

### nginx内置预定义变量
$args_name	在请求中的name参数
$args	所有请求参数
$query_string	$args的别名
$content_length	请求头Content-Length的值
$content_type	请求头Content-Type的值
$host	如果当前有Host，则为请求头Host的值；如果没有这个头，那么该值等于匹配该请求的server_name的值
$remote_addr	客户端的IP地址
$request	完整的请求，从客户端收到，包括Http请求方法、URI、Http协议、头、请求体
$request_uri	完整请求的URI，从客户端来的请求，包括参数
$scheme	当前请求的协议
$uri	当前请求的标准化URI

### proxy_pass指令
一般用在location当中 用于指向被代理的服务器 一般用于代理

以下是代理模块中的一些常用指令：

指令	说明

proxy_connect_timeout	Nginx从接受请求至连接到上游服务器的最长等待时间
proxy_cookie_domain	替代从上游服务器来的Set-Cookie头的domain属性
proxy_cookie_path	替代从上游服务器来的Set-Cookie头的path属性
proxy_set_header	重写发送到上游服务器头的内容，也可以通过将某个头部的值设置为空字符串，而不发送某个头部的方法实现

### upstream模块 一般用于均衡荷载
upstream指令启用一个新的配置区段，在该区段定义一组上游服务器。这些服务器可能被设置不同的权重，也可能出于对服务器进行维护，标记为down。

以下是一个简单的upstream示例:

```
upstream nodejs {
  ip_hash;
  server 127.0.0.1:3000;
  server 127.0.0.1:3001 down;
  keepalive 32;
}
```
#### server指令可选参数：
- weight：设置一个服务器的访问权重，数值越高，收到的请求也越多；
- fail_timeout：在这个指定的时间内服务器必须提供响应，如果在这个时间内没有收到响应，那么服务器将会被标记为down状态；
- max_fails：设置在fail_timeout时间之内尝试对一个服务器连接的最大次数，如果超过这个次数，那么服务器将会被标记为down;
- down：标记一个服务器不再接受任何请求；
- backup：一旦其他服务器宕机，那么有该标记的机器将会接收请求

#### keepalive指令：

Nginx服务器将会为每一个worker进行保持同上游服务器的连接。

#### 负载均衡：
upstream模块能够使用3种负载均衡算法：轮询、IP哈希、最少连接数。
- 轮询：默认情况下使用轮询算法，不需要配置指令来激活它，它是基于在队列中谁是下一个的原理确保访问均匀地分布到每个上游服务器；
- IP哈希：通过ip_hash指令来激活，Nginx通过IPv4地址的前3个字节或者整个IPv6地址作为哈希键来实现，同一个IP地址总是能被映射到同一个上游服务器；
- 最少连接数：通过least_conn指令来激活，该算法通过选择一个活跃数最少的上游服务器进行连接。如果上游服务器处理能力不同，可以通过给server配置weight权重来说明，该算法将考虑到不同服务器的加权最少连接数。

### 跨域问题
在工作中，有时候会遇到一些接口不支持跨域，这时候可以简单的添加add_headers来支持cors跨域。
```
server {
  listen 80;
  server_name api.xxx.com;
	
  add_header 'Access-Control-Allow-Origin' '*';
  add_header 'Access-Control-Allow-Credentials' 'true';
  add_header 'Access-Control-Allow-Methods' 'GET,POST,HEAD';

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host  $http_host;    
  }	
}
```

## 参考链接

[知乎](https://zhuanlan.zhihu.com/p/24524057?refer=wxyyxc1992)
[配置杂记](https://wenjs.me/p/note-of-nginx-configure)