# stream

## 什么是流?
流在node中是非常重要的,gulp的task任务,文件压缩,和http中的请求和响应操作等功能的实现都是基于流来实现的.为什么会有流的出现呢,因为我们一开始有文件操作之后,包括写文件和读文件都会有一个问题,就是会把内容不停的读到内存中,都读完之后再往外写,这样就会导致内存被大量占用.为了解决这个问题就诞生了流,通过流,我们可以读一点内容就往文件中写一点内容,并且可以控制读取的速度.

流的种类很多,最常用的有:

- ReadStream
- WriteStream
- 双工流
- 转换流
- 对象流

流的特点

- 有序的有方向的
- 流可以自己控制速率

什么是读和写呢?

- 读是将内容读取到内存中
- 写是将内存或者文件的内容写入到文件内

流都是基于原生的fs操作文件的方法来实现的,通过fs创建流.流是异步方法,都有回调函数,所有的Stream对象都是EventEmitter的实例.常用的事件有:

- open - 打开文件
- data - 当有数据可读是触发
- error - 在接受和写入过程中发生错误时触发
- close - 关闭文件
- end - 没有更多的数据可读是触发
- drain - 当缓存区也执行完了触发

## 可读流

创建一个可读流
```
let fs = require('fs')
let rs = fs.createReadStream('./2.txt',{
    highWaterMark:3,
    flags:'r',
    autoClose:true,
    start:0,
    end:3,
    encoding:'utf8'
})
```

主要参数说明

- highWaterMark 设置文件一次读取多少个字节
- flags 类型,默认是r(可读的流)
- autoClose 默认为true,读取完毕后自动关闭
- start 读取开始位置
- end 读取结束位置
- encoding 编码方式 默认采用的是buffer 一般读取可以使用默认的方式

默认创建一个流是非流动模式不会读取数据,我们需要接受数据是基于事件的,我们监听一个data事件,数据会自动流出来,数据从非流动模式变为流动模式.读取之前先把文件打开
``` 
rs.on('open',function(){
    console.log('文件被打开了')
})

rs.on('data',function(data){
    console.log(data) 
    rs.pause() //暂停触发on('data')事件,将流动模式又转化成非流动模式
})

内部会不停的自动触发rs.emit('data')事件,直到数据读取完毕为止 当然触发是有事件间隔的 如果我们把流动模式切换非流动模式那么就会暂停触发data事件.

rs.on('end',function(){
    console.log('文件读取完毕') //文件读取完毕触发回调
})

rs.on('close',function(){
    console.log('关闭文件') //我认为这部分放在rs.on('end')的回调函数当中会更好,这样读取玩数据就自动关闭文件
})

rs.on('error',function(err){
    console.log(err) //监控错误
})
```

## 可写流

可写流当中有缓存区的概念

- 第一次写入是真的往文件当中写入,第二次再写入的时候就是往缓存区里面写入了
- 写入时会返回一个布尔值类型,返回为false时表示不要再写入了 下面代码ws的返回值是一个布尔值
- 当内存和正在写入的内容消耗后,会触发一个时间drain

```
let fs = require('fs')
let ws = fs.createWriteStream('2.txt',{
    flags:'w',
    highWaterMark:3,
    encoding:'utf-8',
    start:0,
    autoClose:true,
    mode:0o666,
})
```

参数解析:

- flags:默认是w(写)默认文件不存在会创建,a追加
- highWaterMark:设置当前缓存区的大小
- encoding:编码方式 默认都是二进制的编码
- start:从哪里开始写
- autoClose:默认为true,自动关闭(写完之后销毁)
- mode:写的模式 默认是0o666,可读可写

可写流实现原理 :

```
let fs = require('fs');
let WS = require('./WriteStream')
let ws = new WS('./2.txt',{
    flags:'w',
    highWaterMark:1,
    encoding:'utf-8',
    start:0,
    autoClose:true,
    mode:0o666,
})
let i =9;
function write(){
    let flag = true;
    while(flag && i >=0){
        i--;
        flag = ws.write('111')//ws.write往指定的文件当中写入信息
        console.log(flag)
    }
}
write()
ws.on('drain'),function(){
    console.log('需要写入的内容为空');
    write()
})
```

## 管道流

```
let fs = require('fs')
let rs = fs.createReadStream('./2.txt',{
    highWaterMark:1
})
let ws = fs.createWriteStream('./1.txt',{
    highWaterMark:3
})
rs.pipe(ws)
```

- pipe方法叫做管道,可以控制速率,pipe会监听rs的on('data'),将读取到的内容调用ws.write方法
- 调用写的方法会返回一个不二类型
- 如果返回了false就调用rs.pause()暂停读取
- 等待可写流写入完毕后on('drain')再恢复读取

### pipe实现原理

```
let RS = require('./ReadStream');

let WS = require('./WriteStream');

let rs = new RS('./1.txt',{
  highWaterMark:4
})
let ws = new WS('./2.txt', {
  highWaterMark: 1
});

rs.pipe(ws);
```

