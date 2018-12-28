# node 基本模块

因为Node.js是运行在服务区端的JavaScript环境，服务器程序和浏览器程序相比，最大的特点是没有浏览器的安全限制了，而且，服务器程序必须能接收网络请求，读写文件，处理二进制内容，所以，Node.js内置的常用模块就是为了实现基本的服务器功能。这些模块在浏览器环境中是无法被执行的，因为它们的底层代码是用C/C++在Node.js运行环境中实现的

## global

node环境中唯一的全局变量global

## process

也是有node提供的一个对象,它代表着node.js的进程.可以通过process对象获取到很多有用的信息
```
process = global.process
process.cwd():返回当前的工作目录
process.chdir():切换当前的工作目录
```
javascript是由事件驱动执行的单线程模型,node.js也是.node.js不断执行响应事件的javascript函数,直到没有任何响应事件的函数
可以执行时,node.js就会推出应用程序.
```
process.nextTick(fn)
```
fn函数将在下一次事件循环当中被调用

node.js进程本身的事件就是由process对象来处理的.如果我们响应exit事件,就可以再应用程序即将结束的时候执行某个函数.
```
process.on('exit',function(){
    console.log('程序进程即将结束')
})
```

## 判断javaSctipt执行环境

很多javaScript代码既可以在浏览器环境下执行页可以在node.js环境下执行,但有些时候,程序本身需要判断自己到底在哪个环境当中执行,常用的判断浏览器执行环境的方式就是判断全局变量
```
if(typeof(window) == 'undefined'){
  console.log('当前环境是node环境')
}elseP{
  console.log('当前环境是浏览器环境')
}
```