# node

node.js看着比较高大上,所以也想学点看看,毕竟谁都想当一个全栈工程师

## HTTP 模块

Http模块是node的一个专门用于开启http服务的node模块

使用方式:

只需要引入该模块，使用该模块下的createSearve方法构建服务，并且开启监听端口

## url模块

专门用于处理HTTP服务的请求url的模块

url.parse() 将req.url处理 拆分出url的端口 域名 协议 请求参数等等

## fs模块

fs模块的基本方法
fs.stat 检测目标地址是一个文件夹(目录)还是一个文件
fs.mkdir 创建一个目录
fs.writeFile 写入文件(如果文件不存在则创建一个文件)
fs.appendFile 追加文件
fs.readFile 读取文件
fs.readdir 读取目录
fs.rename 给文件重命名
fs.rmdir 删除目录
fs.unlink 删除文件

## events模块

主要功能 绑定事件和广播事件 
```
const events  = require('events')
let EventEmitter = new events.EventEmitter() 
// 通过on方法 绑定监听事件
EventEmitter.on('data', (ext) => {
  console.log(ext);
});
// 通过emit方法 广播监听事件
EventEmitter.emit('data', data.toString());
```

## 什么是web服务器？
web服务器一般指网站服务器，是指驻留于因特网上某种类型计算机的程序，可以向浏览器等web客户端提供文件，也可以放置网上文件，让全世界浏览；可以防止数据文件，让全世界下载。目前最主要的三个主流的web服务器是Apache Nginx IIS