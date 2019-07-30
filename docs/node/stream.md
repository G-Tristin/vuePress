# stream - 流
流(stream)是 Node.js 中处理流式数据的抽象接口。 所有的流都是 EventEmitter 的实例。也就是可以调用EventEmitter的API。

流的基本类型
- 可写入数据的流
- 可读取数据的流
- 可读可写的数据流
- 在读写过程中可以修改或者转换数据的流

## 对象模式
Node.js创建的流都是运行在字符串和Buffer(或者utf8Array)上。流的实现也可以使用其它类型的javascript值。这些流会以对象模式进行操作。

## 缓冲
可写流和可读流都会在内部的缓冲器中存储数据，可以分别使用writeable.writeableBuffer或readableBuffer来获取。

可缓冲的数据大小取决于传入流构造函数的highWaterMark选项。对于普通的流，highWaterMark指定了字节总数。对于对象模式的流，highWaterMark指定了对象的
总数

当调用stream.push(chunk)时，数据会被缓冲到可读流当中。如果流的消费者没有调用stream.read()，则数据会保留在内部队列直到被消费。

一旦内部的可读缓冲的总大小达到highWaterMark指定的阈值时，流会暂时停止从底层资源读取数据，直到当前缓冲的数据被消费(也就是说，流会停止调用内部的用于填充可读
缓冲的readable_read())

当调用writeable.write(chunk)时，数据会被缓冲在可写流当中。当内部的可写缓冲的总大小小于highWaterMark设置的阈值时，调用writeable.write()会返回true。一旦
内部的缓冲大小达到或者超过highWaterMark时，会返回false。

stream API的主要目的，特别是stream.pipe(),是为了限制数据的缓冲到可接受的程度，也就是读写速度不一致的源头与目的地不会压垮内存

## 流的运作
可写流会暴露了一些方法，比如 write() 和 end() 用于写入数据到流。
而当数据可以从流读取时，可读流会使用EventEmitter API来通知应用程序。
对于只需写入数据到流或从流消费数据的应用程序，并不需要直接实现流的接口，通常也不需要调用 require('stream')

## 可写流
可写流时是对数据要被写入的目的地的一种抽象

可写流的例子包括:
- 客户端的http请求
- 服务端的http响应
- fs的写入流
- zlib流
- crypto流
- TCP socket流
- 子进程 stdin
- process.stdout、process.stderr

所有可写流都实现了 stream.Writable 类定义的接口。

尽管可写流的具体实例可能略有差别，但所有的可写流都遵循同一基本的使用模式，如以下例子所示:
```
const myStream = getWritableStreamSomehow();
myStream.write('一些数据');
myStream.write('更多数据');
myStream.end('完成写入数据');
```

### 'close'事件
当流或者其底层资源被关闭时触发。表明不会再触发其它事件，也不再发生操作。但不是所有的可写流都会触发该事件。

### 'drain'事件 --- 重要
如果调用stream.write(chunk)返回false，则当可以继续写入数据到流时会触发'drain'事件。
```
// 向可写流中写入数据一百万次。
// 留意背压（back-pressure）。
function writeOneMillionTimes(writer, data, encoding, callback) {
  let i = 1000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // 最后一次写入。
        writer.write(data, encoding, callback);
      } else {
        // 检查是否可以继续写入。 
        // 不要传入回调，因为写入还没有结束。
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // 被提前中止。
      writer.once('drain', write); // writer是一个可写流 而所有的流都是EventEmitter实例，所以我们可以通过once方法给流添加一次性事件'drain'，而该事件的回调函数就是再次执行write--也就是继续使用流写入文件。因为drain方法的触发时机就是可以继续写入数据到流。
    }
  }
}
```

### 'error'事件
当写入数据错误时触发，当触发error事件时，流还没有被关闭。

### 'finish'事件
调用stream.end()切缓冲数据都已经传给底层系统后触发
```
const writer = getWritableStreamSomehow(); // 泛指获取可写流的一种方式
for (let i = 0; i < 100; i++) {
  writer.write(`写入 #${i}!\n`);
}
writer.end('写入结尾\n');
writer.on('finish', () => {
  console.error('写入已完成');
});
```

### pipe事件
 - src:通过管道流入到可写流的来源流。
当在可读流上调用stream.pipe()时触发。

```
const writer = getWritableStreamSomehow();
const reader = getReadableStreamSomehow();
writer.on('pipe', (src) => {
  console.error('有数据正通过管道流入写入器');
  assert.equal(src, reader);
});
reader.pipe(writer);
```

### writable.cork方法
强制把所有写入的数据都缓存到内存中。当调用stream.uncork()或者stream.end()时，数据才会被输出。

### writable.end方法
调用 writable.end() 表明已没有数据要被写入可写流。 可选的 chunk 和 encoding 参数可以在关闭流之前再写入一块数据。 如果传入了 callback 函数，则会做为监听器添加到 'finish' 事件。

### writbale.write()

- chunk 要写入的数据
- encoding 如果chunk是字符串，则指定字符编码
- callback 当数据块被输出到目标后的回调函数
return  Boolean

writable.write() 写入数据到流，并在数据被完全处理之后调用 callback。 如果发生错误，则 callback 可能被调用也可能不被调用。 为了可靠地检测错误，可以为 'error' 事件添加监听器。

在接收了 chunk 后，如果内部的缓冲小于创建流时配置的 highWaterMark，则返回 true 。 如果返回 false ，则应该停止向流写入数据，直到 'drain' 事件被触发。

## 可读流
可读流是对提供数据来源的一种抽象

可读流的例子包括:
- 客户端的http响应
- 服务器的http响应
- fs的读取流
- zlib流
- crypto流
- TCP socket
- 子进程的stdout和stderr
- process.stdin
所有可读流都实现了 stream.Readable 类定义的接口。

### 两种读取模式
可读流运作于两种模式之一:流动模式或暂停模式
- 流动模式中，数据自动从底层系统读取，并通过EventEmitter接口的事件尽可能快的被提供给应用程序。
- 在暂停模式中，必须显式调用stream.read()读取模块。

所有可读流都开始于暂停模式，可以通过一下方式切换到流动模式:
- 添加'data'事件句柄
- 调用stream.resume()
- 调用stream.pipe() 
可读流可以通过一下方式切换回暂停流
- 如果没有管道目标，则调用stream.pause()
- 如果有管道目标，则移除所有管道目标。调用stream.unpipe()可以移除多个管道目标
如果可读流切换到流动模式，且没有可用的消费者来处理数据，则数据将会丢失。 例如，当调用 readable.resume() 时，没有监听 'data' 事件或 'data' 事件句柄已移除。

添加 'readable' 事件句柄会使流自动停止流动，并通过 readable.read() 消费数据。 如果 'readable' 事件句柄被移除，且存在 'data' 事件句柄，则流会再次开始流动。

### 三种状态
可读流的两种模式是对发生在可读流中更加复杂的内部状态管理的一种简化的抽象。

在任意时刻，可读流会处于以下三种状态之一:
- readable.readableFlowing === null
- readable.readableFlowing === false
- readable.readableFlowing === true
当 readable.readableFlowing 为 null 时，没有提供消费流数据的机制，所以流不会产生数据。 在这个状态下，监听 'data' 事件、调用 readable.pipe()、或调用 readable.resume() 都会使 readable.readableFlowing 切换到 true，可读流开始主动地产生数据并触发事件。

调用 readable.pause()、 readable.unpipe()、或接收到背压，则 readable.readableFlowing 会被设为 false，暂时停止事件流动但不会停止数据的生成。 在这个状态下，为 'data' 事件绑定监听器不会使 readable.readableFlowing 切换到 true。

当 readable.readableFlowing 为 false 时，数据可能会堆积在流的内部缓冲中。
```
const { PassThrough, Writable } = require('stream');
const pass = new PassThrough();
const writable = new Writable();

pass.pipe(writable);
pass.unpipe(writable);
// readableFlowing 现在为 false。

pass.on('data', (chunk) => { console.log(chunk.toString()); });
pass.write('ok'); // 不会触发 'data' 事件。
pass.resume(); // 必须调用它才会触发 'data' 事件。 data事件的触发机制是可读流从暂停模式切换到流动模式
```

### 使用一种接口风格
对于大多数用户，建议使用 readable.pipe()，因为它是消费流数据最简单的方式。 如果开发者需要精细地控制数据的传递与产生，可以使用 EventEmitter、 readable.on('readable')/readable.read() 或 readable.pause()/readable.resume()。

### 'close'事件
当流或者其底层资源被关闭时触发。表明不会在触发其他事件，也不会再发生操作。

不是所有的可读流都会触发'close'事件

### 'data'事件
- chunk 数据块 对于非对象模式的流，chunk可以时字符串或者时Buffer。对于对象模式的流，chunk可以是任意的javascript的值，除了null。

当流将数据块传送给消费者后触发。

当调用 readable.pipe()， readable.resume() 或绑定监听器到 'data' 事件时，流会转换到流动模式。 当调用 readable.read() 且有数据块返回时，也会触发 'data' 事件。

这里的readable指的时可读流 比如使用fs.createReadStream创建出来的流

如果使用 readable.setEncoding() 为流指定了默认的字符编码，则监听器回调传入的数据为字符串，否则传入的数据为 Buffer。
```
const readable = getReadableStreamSomehow();
readable.on('data', (chunk) => {
  console.log(`接收到 ${chunk.length} 个字节的数据`);
});
```
### 'end'事件
当流中没有数据可供消费时触发
'end'事件只有再数据被完全消费的时候才会触发。要想触发该事件，可以将流切换到流动模式，或反复调用stream.read()直到数据被消费完。
```
const readable = getReadableStreamSomehow()
readable.on('data',(chunk)=>{
  console.log(`接收到${chunk.length}个字节数据`)
})
readable.on('end',()=>{
  console.log('没有数据了')
})
```
### 'error'事件
当流因底层内部出错而不能产生数据、或推送无效的数据块时触发

### 'readable'事件
当流中有数据可供读取时触发。
```
const readable = getReadableStreamSomehow()
readable.on('readable',function(){
  // 有数据可读时触发
  let data
  while(data = this.read()){
    console.log(data)
  }
})
```
'readable' 事件表明流有新的动态：要么有新的数据，要么到达流的尽头。 对于前者，stream.read() 会返回可用的数据。 对于后者，stream.read() 会返回 null。 例如，下面的例子中， foo.txt 是一个空文件:
```
const fs = require('fs');
const rr = fs.createReadStream('foo.txt');
rr.on('readable', () => {
  console.log(`读取的数据: ${rr.read()}`);
});
rr.on('end', () => {
  console.log('结束');
});
```

### readable.pause()

使流动模式的流停止触发'data'事件，并切换出流动模式。任何可用的数据都会保留再内部缓存中。
```
const readable = getReadableStreamSomehow()
readable.on('data',(chunk)=>{
  console.log(`接收到${chunk.length}个字节的数据`)
  readable.pause()
  console.log('暂停一秒')
  setTimeout(function(){
    console.log('数据开始流动了')
    readable.resume()
  },1000)
})
```

### readbale.pipe()
 - destination 数据写入的目标
 - options 
    - end 当读取器结束时终止写入器。
 - 返回目标可写流，如果时Duplex流或者是Transform流则可以形成管道链
 绑定可写流到可读流，将可读流自动切换到流动模式，并将可读流的所有数据推送到绑定的可写流。数据流会被自动管理，所以即使可读流更快，目标可写流也不会
 超负荷。

例子: 将可读流的所有数据通过管道推送到file.txt文件:
```
const readable = getReadableStreamSomehow()
const writeable = fs.createWriteStream('file.text')
reable.pipe(writable)
```
可以在单个可读流上绑定多个可写流

readable.pipe() 会返回目标流的引用(注意是目标流的引用)，这样就可以对流进行链式地管道操作:
```
const fs = require('fs');
const r = fs.createReadStream('file.txt');
const z = zlib.createGzip();
const w = fs.createWriteStream('file.txt.gz');
r.pipe(z).pipe(w);
```
如果可读流发生错误，目标可写流不会自动关闭，需要手动关闭所有流以避免内存泄漏。

### readable.read()
- size 要读取的数据的字节数
从内部缓冲拉取并返回数据。如果没有可读的数据则返回null,默认情况下readable.read()返回的数据对象是buffer对象，除非使用readable.setEconding()指定字符编码或者流处于对象模式。

如果可读的数据不超过size的字节数，则返回内部缓冲剩余的数据。

如果流已经结束则返回null

如果没有指定size参数，则返回内部缓冲中的所有数据

readable.read()应该只对处于暂停模式的可读流进行操作。在流动模式中，readable.read会自动调用直到内部缓冲的数据被耗尽
```
const readable = getReadableSreamSomehow()
readable.on('readable',()=>{
  let chunk
  while(null !== (chunk = readable.read())){
    console.log(`接收到 ${chunk.length} 字节的数据`)
  }
})
```
### readable.readableLength
返回队列中准备读取的字节数

### readable.resume()
返回 this
将被暂停的流恢复流动，触发'data'事件

readable.resume() 使用场景 可以用来充分消耗流中的数据，但无需处理任何数据
```
getReadableStreamSomehow()
  .resume()
  .on('end', () => {
    console.log('到达流的尽头，但无需读取任何数据');
  });
```
### readable.setEncoding
为从可读流读取的数据设置字符编码

默认情况下没有字符编码，流返回的是Buffer对象。如果设置了字符编码，则流数据返回自定编码的字符串。例如，调用readable.setEconding('utf-8')会将数据解析为UTF-8数据，返回字符串，调用readable.setEconding('hex')则会将数据编码成十六进制字符串。

```
const readable = getReadableStreamSomehow()
readable.setEconding('UTF-8')
readable.on('data',(chunk)=>{
  assert.equal(typeof chunk ,'string')
  console.log('读取到**个字符的字符串数据'，chunk.length)
})
```

### readable.unpipe

- destination 要移除管道的可写流

解除之前使用pipe绑定的可写流
如果没有指定destination 则解绑所有通道
如果指定了destination 但它没有建立通道，那么不起任何作用
```
const fs = require('fs')
const readable = getReadableStreamSomehow()
const writeable = fsl.createWriteStream('flie.text')
readable.pipe(writeable)
setTimeOut(()=>{
  console.log('停止写入 file.text')
  readable.unpipe(writeable)
  console.log('手动关闭文件流')
  readable.end()
},1000)
```

### readable.unshift
- chunk 要推回可读队列的数据块。对于非对象模式的流，chunk必须是字符串，Buffer或者uint8Array。对于对象模式的流，chunk可以是任何值，除了null
作用:

将数据块推回内部缓冲。可用于以下情景:正被消费中的流需要将一些已经被拉出的数据重置为未消费状态，以便这些数据传送给其他方。

触发'end'事件或抛出运行错误后，不能再雕鹰readable.unshift()

使用stream.unshift()的开发者可以烤炉切换到transform流。

## 双工流或者转换流

双工流 同时实现了Readable和writeable的接口的流 也称Duplex流

Duplex流的例子包括

- TCP socket
- zlib 流
- crypto 流

## Stream.transform 类

转换流 也是双工流的一种，但它的输入和输出是相关联的。与双工流一样 transform流也同样实现了Readable和writeable的接口

transform流的例子包括
- zlib 流
- crypto 流

## transform.destory

销毁流，并触发'error'事件。调用该方法后transform流会释放全部内部资源。实现者不要重写该方法，而应该实现readable_destroy().Transform流的_destroy()方法的默认实现会触发'close'事件。

## stream.finished(stream ,callback) 
 - stream 可写流或者可读流
 - callback 通知回调函数
当流不再可读，可写、发生错误、或提前关闭，通过该函数获得通知
```
const { finished } = require('stream');

const rs = fs.createReadStream('archive.tar');

finished(rs, (err) => {
  if (err) {
    console.error('流发生错误', err);
  } else {
    console.log('流已读取完');
  }
});

rs.resume(); // 开始读取流。
```

主要用于处理流被提前销毁(如http请求被中止)等异常情况，此时流不会触发'end'或'finish'事件。

finished接口也可以promise化
```
const finished = util.promisify(stream.finished);

const rs = fs.createReadStream('archive.tar');

async function run() {
  await finished(rs);
  console.log('流已读取完');
}

run().catch(console.error);
rs.resume(); // 开始读取流
```

## stream.pipeline(...stream[,callback])

- ...stream 要用管道连接的二个或者多个流
- callback 通知回调函数

使用管道连接多个流，并传递错误与完成清理工作，当管道连接完成时通知回调函数
```
const { pipeline } = require('stream');
const fs = require('fs');
const zlib = require('zlib');

// 使用 pipeline 接口连接多个流，并在管道连接完成时获得通知。
// 使用 pipeline 可以高效地压缩一个可能很大的 tar 文件：

pipeline(
  fs.createReadStream('archive.tar'),
  zlib.createGzip(),
  fs.createWriteStream('archive.tar.gz'),
  (err) => {
    if (err) {
      console.error('管道连接失败', err);
    } else {
      console.log('管道连接成功');
    }
  }
);
```
pipeline 接口也可以Promise化:
```
const pipeline = util.promisify(stream.pipeline);

async function run() {
  await pipeline(
    fs.createReadStream('archive.tar'),
    zlib.createGzip(),
    fs.createWriteStream('archive.tar.gz')
  );
  console.log('管道连接成功');
}

run().catch(console.error);
```
 