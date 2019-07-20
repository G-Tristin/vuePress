#nginx

## 正向代理和反向代理
代理是服务器与客户端之间假设的一层服务器，代理将接收客户端的请求并将它转发给服务器，然后将服务器的响应转发给客户端。

不管是正向代理还是反向代理实现的都是上诉功能

### 正向代理
正向代理是为客户端服务的，客户端可以依赖正向代理访问到它无法访问的服务器资源。正向代理对客户端时透明的但是对服务器时不透明的。即服务端并不知道自己收到的请求
是来自客户端的还是代理服务器的。

### 反向代理
反向代理是给服务端服务的，反向代理可以帮助服务器接受来自客户端的请求，帮助服务器做请求转发、均衡荷载。

反向代理对服务器是透明的，对客户端时非透明的。即使我们并不知道我们访问的时代理服务器，而服务器知道反向代理在为它服务。

## 为什么要用nginx做反向代理
使用反向代理的原因主要有2个

1.安全权限。使用反向代理之后用户无法直接访问到服务器，必须首先通过nginx。可以通过在nginx上将危险的或者没有权限的请求过滤掉。

2.均衡负载

### 前端可以使用nginx做什么?
1.快速实现简短的访问限制  -->即设置白名单与黑名单

2.解决跨域问题

由于浏览器与服务器存在的同源策略即当服务器与浏览器之间的端口域名和协议不同时就会存在跨域的问题 此时就可以使用代理服务器来代理请求因为
服务器与服务器之间是没有同源策略的。

3.适配PC和移动的环境 

现在很多网站都同时存在PC站和H5站，因此根据用户的浏览器环境来切换站点是很常见的需求。Nginx可以通过内置变量$http_user_agent,获取到请求客户端的
userAgent,从而知道用户是处于PC端还是移动端，进而控制重定向到h5站还是pc站。代码如下：
```
location / {
      # 移动、pc设备适配
      if ($http_user_agent ~* '(Android|webOS|iPhone|iPod|BlackBerry)') {
          set $mobile_request '1';
      }
      if ($mobile_request = '1') {
          rewrite ^.+ http://mysite-base-H5.com;
      }
  }  
```

4.合并请求

前端性能优化种重要的一点就是尽量减少http请求的数量，通过nginx-http-concat模块(淘宝开发的第三方模块，需要单独安装)用一种特殊的请求rul规则
例子(example.com/??1.js,2.js,3.js),前端可以将多个资源的请求合并为一个请求，后台Nginx会获取各个资源并拼接成一个结果经行返回。例如上面的例子通过
一个请求将1.js,2.js,3.js资源合并成一个请求，减少了浏览器的开销。本地server mysite-base.com为例，static/js文件夹下有三个文件，分别是a.js，b.js,c.js。

Nginx的配置如下
```
location /static/js/ {
      concat on; # 是否打开资源合并开关
      concat_types application/javascript; # 允许合并的资源类型
      concat_unique off; # 是否允许合并不同类型的资源
      concat_max_files 5; # 允许合并的最大资源数目
  }
```
当浏览器请求http://mysite-base.com/static/js/??a.js,b.js,c.js 时，发现三个js被合并成一个返回了。

5.图片处理
在前端开发中，经常需要不同尺寸的图片。现在的云存储图片基本都提供处理服务(一般是通过在图片链接上加参数)。其实使用Nginx，可以通过几十行配置，
搭建出一个属于自己的图片处理服务。完全能满足日常对图片的裁剪/缩放/旋转/图片品质等处理需求。要用到第三放模块ngx_http_image_filter_module。

代码示例：
```
# 图片缩放处理
  # 这里约定的图片处理url格式：以 mysite-base.com/img/路径访问
  location ~* /img/(.+)$ {
      alias /Users/cc/Desktop/server/static/image/$1; #图片服务端储存地址
      set $width -; #图片宽度默认值
      set $height -; #图片高度默认值
      if ($arg_width != "") {
          set $width $arg_width;
      }
      if ($arg_height != "") {
          set $height $arg_height;
      }
      image_filter resize $width $height; #设置图片宽高
      image_filter_buffer 10M;   #设置Nginx读取图片的最大buffer。
      image_filter_interlace on; #是否开启图片图像隔行扫描
      error_page 415 = 415.png; #图片处理错误提示图，例如缩放参数不是数字
  }
```
这里只是最基本的配置。此外，可以通过proxy_cache配置Nginx缓存，避免每次请求都重新处理图片，减少Nginx服务器处理压力；还以可以通过和nginx-upload-module一起使用加入图片上传的功能等。

6.页面内容修改

[nginx介绍](https://juejin.im/post/5bacbd395188255c8d0fd4b2)