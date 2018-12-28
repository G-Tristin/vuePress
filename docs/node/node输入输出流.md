## node流(stream)

流（stream）在 Node.js 中是处理流数据的抽象接口（abstract interface）。 stream 模块提供了基础的 API 。使用这些 API 可以很容易地来构建实现流接口的对象。Node.js 提供了多种流对象。 例如， HTTP 请求 和 process.stdout 就都是流的实例。流可以是可读的、可写的，或是可读写的。所有的流都是 EventEmitter 的实例。

## 介绍stdin|stdout(I/O)
stdin和stdout是绑定在process下的对象,process.stdin.on('data',fn(chunk){})监听键盘的事件(当我们按下enter键时会中断一次输入).回调函数中的参数是键盘输入的数据,process.stdout.write()在命令行输出内容
```
var num1,num2
process.stdout.write('请输入mun1的值 :')
process.stdin.on('data',function(chunk){
  if(!num1){
    num1 = Number(chunk)
    process.stdout.write('请输入num2的值 :')
  }else{
    num2 = Number(chunk)
    process.stdout.write('sum:' + (num1+num2))
    process.exit() //显示的结束进行
  }
})
```