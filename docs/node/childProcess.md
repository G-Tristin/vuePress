# child_process - 子进程

在node当中只有一个线程执行所有的操作，如果某个操作需要消耗大量的CPU资源的情况下，后续的操作都需要等待。
在Node.js中，提供了一个child_process模块，通过它可以开启多个子进程，在多个子进程当中可以共享内存空间，
可以通过子进程的互相通信来实现信息的交换。

child_process提供了4个方法，用于创建子进程，这四个方法分别是spawn、execFile、exec和fork。所有的方法都是异步的。

### 在windows上衍生.bat和.cmd文件
child_process.exec()和child_process.execFile()之间的重要区别可能因平台而异。在Unix类型的操作系统(Unix、Linx、macOS)上，child_process.execFile()可以更高效，因为默认情况下它不会衍生出shell。但是在Windows上 .bat和.cmd文件在没有终端的情况下不能自行执行，因此无法使用child_process.execFile()启动。在windows上运行时，可以使用带有shell选项集的childd_process.spawn()、或使用child_process.exec()、或通过衍生 cmd.exe 并将 .bat 或 .cmd 文件作为参数传入（也就是 shell 选项和 child_process.exec() 所做的）。 在任何情况下，如果脚本文件名包含空格，则需要加上引号。

// 仅限window系统
```
const {spaw}  = require('child_process')
const bat = spaw('cmd.exe',['/c','my.bat'])
bat.stdout.on('data',(data)=>{
  console.log(data.toSting())
})
bat.stderr.on('data',(data)=>{
  console.log(data.toString())
})
bat.on('exit',(code)=>{
  console.log(`子进程退出码:${code}`)
})
```
或者
```
const {exec} = require('child_process')
exec('my.bat',(err,stdout,stderr)=>{
  if(err){
    console.log(err)
    return
  }
  console.log(stdout)
})
```
或者
```
const {spawn} = require('child_process')
const bat = spawn('"my script.cmd"',['a','b'],{shell:true})
//或者
const {exec} = require('child_process')
exec('"my script.cmd"a b',(err,stdout,stderr)=>{

  // 注 这里对应--如果脚本文件名包含空格，则需要加上引号 '"my script.cmd"'
  //...
})
```

### child_process.exec()
创建一个shell,然后在shell里面执行命令。执行完成后，将stdout、stderr作为参数传入回调函数

如下例:
1.执行成功，error为null;执行失败，error为Error实例。error.code为错误码。
2.stdout、stderr为标准输出、标准错误。默认是字符串，除非options.encoding为buffer。
```
var exec = require('child_process').exec
exec('ls -al',function(error,stdout,stderr){
  if(error){
    console.log('error:'+error)
    return
  }
  console.log('stdout:'+ stdout)
  console.log('stderr'+ typeof stderr)
})
```
失败的命令
```
exec('ls hello.txt', function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error);
        return;
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
});
```
参数说明:

- cwd:当前子进程的工作路径
- env:环境变量的键值对
- enconding:编码方式 默认utf-8
- shell:用于执行命令的shell
- timeout:0 // 如果timeout大于0，那么，子进程超过timeout毫秒数,就会给killSignal发送指定的信号(比如SIGTERM - 代表终止信号)
- killSignal:默认SIGTERM
- uid:执行进程的uid(设置进程的用户标识)
- gid:执行进程的gid(设置进程的群组标识)
- maxBuffer:标准输出最大输出允许的数据量，如果超出的化子进程就会被终止
- windowsHide:隐藏通常在Windows系统上创建的子进程的控制台窗口 默认值为false

备注:
- 如果运行没有出错那么error为null。如果运行出错，那么，error.code就是退出代码（exist code），error.signal会被设置成终止进程的信号。
- 传给 exec 函数的command字符串由shell直接处理，那就会产生一些安全性的问题。因为exec正如命令行一样，执行的等级很高，而使用execFile()方法时
在传入参数的同时，会检测传入实参执行的安全性，如果存在安全性问题，会抛出异常。这也是child_peocess.exec()与child_process.execFile()的区别前者会衍生shell直接执行shell命令，后者不会衍生shell。

eg:
```
exec('ls hello.txt; rm -rf *', function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error);
        // return;
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
});
```
在Unix系统下运行该命令会删除文件

### child_process.execFile()
和child_peocess.exev()有点类似，不同的地方在于child_process.execFile(),不会衍生一个新的shell。

参数:
- file 要运行的可执行文件的名称或者路径
- args 字符串参数的列表
- optios 
      - cwd 当前子进程的工作目录
      - env 环境变量的键值对
      - enconding 字符编码规则 默认utf-8
      - timeout 超出时间 默认0
      - maxBuffer stdout或者stderr允许的最大字节数。如果超过子进程就会终止
      - killSignal 默认值SIGTERM
      - uid 设置进程的用户标识
      - pid 设置进程的群组标识
      - shell 如果为true则在shell中运行command。 在 UNIX 上使用 '/bin/sh'，在 Windows 上使用 process.env.ComSpec。 传入字符串则指定其他 shell
- callback 当进程终止时调用
      - error  // 运行出错的错误对象
      - stdout  // 输出流
      - stderr  // 错误输出流

特性:

child_process.execFile() 函数类似于 child_process.exec()，但默认情况下不会衍生 shell。 相反，指定的可执行 file 直接作为新进程衍生，使其比 child_process.exec() 稍微更高效。支持与 child_process.exec() 相同的选项。 由于没有生成 shell，因此不支持 I/O 重定向和文件通配等行为。
```
const { execFile } = require('child_process');
const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});
```

注意:如果启用了 shell 选项，则不要将未经过处理的用户输入传给此函数。 包含 shell 元字符的任何输入都可用于触发任意命令执行。相当于衍生了shell

### child_process.fork

参数：

- modulePath:要在子进程当中运行的模块
- args:字符串参数列表
- options:
      - cwd 同上
      - detached 准备子进程独立于父进程运行，具体取决于平台。(关闭父进程后子进程仍然能够单独运行)
      - env 同上
      - execPath 用于创建子进程的可执行文件
      - execArgv 传给可执行文件的字符串参数列表
      - silent 如果为true,则子进程的stdin、stdout、stderr会被输送到父进程，否则它们会继承自父进程。 默认为false
      
特性:

child_process.fork() 方法是 child_process.spawn() 的一个特例，专门用于衍生新的 Node.js 进程。

  ## 错误处理

  错误处理包含两种场景，这两种场景有不同的处理方式。

  - 场景1：命令本身不存在，创建子进程报错
  - 场景2：命令存在，但运行过程中出错

  ```
  var spawn = require('child_process').spawn
  var child = spawn('bad_command')
  child.on('error',(err) =>{ 
    console.log('Faild to start child process 1')
  })
  以上是第一种错误处理的方式(针对于第一个进程)

  以下是第二种错误处理的方式 并且这种方式可以获取进程中的错误信息
  var child2 = spawn('ls',['nonexistFile'])
  child2.stderr.on('data',function(data){
    console.log('Error msg from process:2' + data)
  })

  以下是第一种错误处理的方式(针对于第二个进程)
  child2.on('error',(err)=>{
    console.log('Failed to start child process:2')
  })