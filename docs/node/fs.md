#fs模块

## 基本概念
### 文件描述符
1.任何指定的文件描述符都必须支持读取
2.如果将文件描述符指定为path，则不会自动关闭它

fs模块的API有很多，如果想详细的了解则需要仔细的查看文档，但是在日常的开发中我们可能不会使用到那么多的API，以下介绍一些在
开发过程中将会常用到的Api,并且介绍的都是异步版本的API。

### fs.open(path,flags,mode,callback) 该方法用于打开文件,以便fs.read()读取
 - path 文件路径
 - flags 打开文件的方式
 - mode 文件的权限
 - callback 回调函数
   - err 错误信息
   - fd 文件描述符

### fs.close(fd,callback) 关闭当前文件 fd是被打开文件时创建的描述符

### fs.read(fd,buffer,offset,length,position,calllback)
 - fd 文件描述符 从被打开的文件中获取
 - buffer 是存放读取到的数据的buffer对象
 - offset 指定向buffer中存放数据的起始位置
 - length 指定文件中数据的字节数
 - position 指定文件中读取内容的起始位置
 - callback 回调
  - err 抛出错误
  - bytesRead 从文件中读取内容的实际字节数
  - buffer 被读取的缓存区对象
eg:
```
var fs = require('fs'); // 引入fs模块
// 打开文件
fs.open('./text.txt', 'r', function(err, fd) {
    if (err) {
        throw err;
    }
    console.log('open file success.');
    var buffer = new Buffer(255); // 创建一个buffer对象，用于存储fs.read读取到的数据
    // 读取文件
    fs.read(fd, buffer, 0, 10, 0, function(err, bytesRead, buffer) {
        if (err) {
            throw err;
        }
        // 此时已经将数据存放到我们创建出来的buffer对象当中
        // 打印出buffer中存入的数据
        console.log(bytesRead, buffer.slice(0, bytesRead).toString());
 
        // 关闭文件
        fs.close(fd);
    });
});
```

### fs.readdir(path,options,callback)
 - path 
 - options 
  - encoding  默认utf-8
  - withFileTypes  默认值为false
 - callback
  - err
  - files 
异步读取目录的内容，回调中有2个参数,其中files是目录中文件名的数组
如果 options.withFileTypes 设置为 true，则 files 数组将包含 fs.Dirent 对象。

### fs.readFile(path,options,callback)  

  异步的读取文件的全部内容 --- 注意是全部

  - path:string|buffer|url|integer 文件名或者文件描述符
  - option
    - enconding 编码方式 默认值是null 常用utf-8
    - flag 默认值r 表示是读取文件
  - callback
    - err
    - data - 读取的数据 如果没有指定编码方式则默认是二进制数据
  ```
  fs.readFile('./message',(err,data)=>{
    console.log(data)
  })
  ```
### fs.write(fd,buffer,offset,length,position,callback)
  - fd 通过fs.open()获取到的文件描述符
  - buffer 将要被写入文件当中的buffer对象
  - offset 决定buffer中要被写入的部位，
  - length 一个整数指定要写入的字节数
  - position 指定文件开头的偏移量(数据应该被写入到的目标文件的偏移量)
  - callback 
   - err 错误信息
   - bytesWritten 被写入到文件当中的实际buffer字节数
   - buffer 目前我认为是被写入的buffer

### fs.write(fd,string,position,enconding,callback)
  大部分参数和上面的方法类似
  - string 将要被写入文件的字符串
  - callback
   - err 错误
   - written 指定传入的字符串中被写入的字节数。被写入的字节数不一定与被写入的字符串字符数相同
   - string 被写入额字符串

### fs.writeFile(file,data,options,callback)
 - file 文件名或者文件描述符 当 file 是一个文件名时，异步地将数据写入到一个文件，如果文件已存在则覆盖该文件。 
 - data  可以是字符串或 buffer。将要被写入到特定文件的数据
 - options 
  - encoding 字符编码方式
  - mode 文件的权限 可读|可写|可执行
  - flag 文件系统标志 r-打开文件用于读取 w-打开文件用于写入
- callback
  - err 错误信息

### fs.rename(oldPath,newPath,callback) 对文件重命名

### fs.stat(path,options,callback) 该方法一般用于查看被打开的是文件还是文件夹
- callback 
 - err
 - stats  ---是一个fs.Stats对象
不建议在调用 fs.open()、 fs.readFile() 或 fs.writeFile() 之前使用 fs.stat() 检查文件是否存在。 而是应该直接打开、读取或写入文件，如果文件不可用则处理引发的错误。
要检查文件是否存在但随后并不对其进行操作，则建议使用 fs.access()。

### fs.watch(fileName,options,listener)
- options
 - persistent 如果文件已经被监视,进程是否应继续进行 默认值true
 - recursive 指示应监视所有子目录 默认值false
 - enconding 指定用于传给监听器的文件名的字符编码 默认utf-8
- listener function|undefined 默认值undefined
 - evenType string
 - filename string
返回值是fs.FSWatcher

监听fileName的更改，fileName是文件或者目录

第二个参数是可选的。如果传入字符串，则它指定encoding。否则需要传入对象。

监听器回调有2个参数(eventType,filename)。eventType是'rename'或者'change',filename是触发事件的文件名称

在大多数平台上，每当文件名在目录当中消失或者出现，就会触发'rename'事件

监听器回调绑定在由 fs.FSWatcher触发的change事件上，但它与eventType的'change'值不是一回事

### fs.watchFile(filename,options,listener)

- options 
 - presistent 如果文件已经被监视,进程是否应继续进行 默认值true
 - interval 指示轮询目标的频率
- listener
 - current 当前的stat对象
 - previous 之前的stat对象
监视filename的更改。每当访问文件时都会调用listener回调
```
fs.watchFile('message.text', (curr, prev) => {
  console.log(`当前的最近修改时间是: ${curr.mtime}`);
  console.log(`之前的最近修改时间是: ${prev.mtime}`);
});
```
这些 stat 对象是 fs.Stat 的实例。

### fs.appendFile(path,data,optiions,callback)

- path 文件名或者文件描述符
- data 将要被追加到目标文件的数据资源 string|buffer
- options 
  - enconding 编码方式 默认utf-8
  - mode 权限值 默认O066
  - flag 文件系统标志 默认'a'
- callback 
  - err 错误
异步的将数据追加到目标文件当中,如果文件尚不存在则创建文件。data可以是字符串或者buffer。

## 读写文件当中的流

### fs.createReadstream(path,options)  
 - path string|buffer|url
 - options string | object
  - flag 文件系统标识符 默认'r'
  - encoding 默认为null
  - fd 默认为null
  - mode 默认为O066 文件的权限值
  - autoClose 默认值为true 出现错误或者读取结束会自动关闭流
  - start 
  - end 默认值 infinity
  - highWaterMark 默认值是64*1024

返回值为 fs.ReadStream 

该方法只是创建了一个可读流，但是监听的事件在readStream实例上

与可读流的16KB的默认highWaterMark不同，此方法返回的流具有64kb的默认值

options可以包括start和end值,以从当前文件中读取一定范围的字节而不是读取整个文件。start和end都包含在内
并且statr的默认值为0。如果指定了fd并且start被省略或是undefined,则fs.createReadStream()从当前文件位置开始顺序读取。enconding可以是buffer接收的任何一种字符编码。

如果指定了fd,则ReadStream将忽略path参数并使用指定的文件描述符。

### fs.ReadStream类

通过fs.createReadStream创建的可读流的返回值都是fs.ReadStream类的实例。所以都可以调用到该类底下的方法。

并且可以使用到可读流下面的所有方法具体可在stream那一章观看

close事件 fs.ReadStream的底层描述符关闭时触发

open事件 fs.ReadStream的文件描述符打开时触发

ready事件 fs.ReadStream准备好使用时触发

data事件 fs.ReadStream读取完文件时触发

```
const fs = require('fs')
const readStream =  fs.createReadStream('./message1','utf-8')
readStream.on('open',(fd)=>{
  console.log('文件被打开了' + fd)
})
readStream.on('data',(chunk)=>{
  console.log(chunk)
})
readStream.on('err',(err)=>{
  console.log('文件读取失败' + err)
})
readStream.on('colse',()=>{
  console.log('文件被关闭')
})
readStream.on('end',()=>{
  console.log('文件读取结束')
})
```

### fs.createWriteStream
 - path string|buffer|url
 - options string|object
  - flags 文件系统标识 默认值为'w'
  - encoding 字符集 utf-8
  - mode 文件的权限 默认值O066
  - autoClose 是否自动关闭 true
  - start 

该方法只是创建了一个可写流，但是监听的事件在writeStream实例上

options可以包括一个start选项，允许在文件开头之后的某个位置写入文件，允许的值范围在[0,Number.MAX_SAFE_INTEGER]范围内。如果要修改文件而不是覆盖它，则flags需要为r+而不是默认的w默认。
encoding可以是buffer接受的任何一种字符编码。

与 ReadStream 类似，如果指定了 fd，则 WriteStream 将忽略 path 参数并使用指定的文件描述符。

### fs.WriteStream类

通过fs.createWriteStream创建的可写流的返回值都是fs.WriteStream类的实例。所以都可以调用到该类底下的方法。

并且可以使用到可写流下面的所有方法具体可在stream那一章观看

#### 事件

err事件 读取文件错误时触发的事件

open 被读取文件被打开时触发的事件

finish 文件写入完成时触发的事件

close 被写入的文件已经关闭

#### 方法

writeStream.write('这是我要做的测试内容') 写入数据到文件，参数代表写入的数据

writeStream.end() 停止写入数据到文件

```
const fs=require('fs');
const path=require('path');
let writeStream=fs.createWriteStream('./test/b.js',{encoding:'utf8'});
 
//写入文件发生错误事件
writeStream.on('error', (err) => {
    console.log('发生异常:', err);
});
//已打开要写入的文件事件
writeStream.on('open', (fd) => {
    console.log('文件已打开:', fd);
});
//文件已经就写入完成事件
writeStream.on('finish', () => {
    console.log('写入已完成..');
    console.log('读取文件内容:', fs.readFileSync('./test/b.js', 'utf8')); //打印写入的内容
    console.log(writeStream);
});
 
//文件关闭事件
writeStream.on('close', () => {
    console.log('文件已关闭！');
});
 
writeStream.write('这是我要做的测试内容');
writeStream.end() 结束写入数据到文件
```