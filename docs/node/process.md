# process - 进程
概念:

在Node.js当中每个应用程序都是一个进程类的实例对象。使用process对象代表应用进程，这是一个全局对象，可以通过它来获取Node.js应用程序以及运行该程序的用户、环境等各种信息的属性、方法、事件。

## 进程事件
process对象是一个EventEmitter的实例 

### beforeExit事件
当Node.js请空其事件循环并且没有其他工作要安排时，会触发'beforeExit'事件。通常，Node.js 进程将在没有调度工作时退出，但是在'beforeExit'事件上注册的监听器可以进行异步调用，从而导致 Node.js 进程继续。调用监听器回调函数时会将 process.exitCode 的值作为唯一参数传入。

### exit事件
当Node.js进程因为一下原因之一即将退出时，则触发'exit'事件
 - 显示的调用process.exit()方法
 - Node.js事件循环不再需要执行任何其他的工作时
 此时无法阻止退出事件循环，并且一旦所有'emit'事件的监听器都已经完成运行时，Node.js进程终止

使用 process.exitCode 属性指定的退出码或传给 process.exit() 方法的 exitCode 参数调用监听器回调函数。
```
process.on('exit', (code) => {
  console.log(`退出码: ${code}`);
});
```
该事件监听函数只能执行同步代码，不能执行异步代码。在调用 'exit' 事件监听器之后，Node.js 进程将立即退出，从而导致在事件循环中仍排队的任何其他工作被放弃。

### message事件
如果使用IPC通道衍生node.js进程，则只要子进程收到父进程使用childProcess.send()发送的消息，就会触发messge事件。

### process.abort()事件
process.abort()方法会使Node.js进程立即结束，并生成一个core文件。

## 进程中的重要属性
- stdin 标准输入流
- stdout 标准输出流
- stderr 标准错误输出流
- argv 终端输入参数数组
  - 第一个元素是process.execPath
  - 第二个元素是正在执行的javascript文件的路径
  - 其余的元素都是命令行参数
- env 操作系统环境信息
- pid 应用程序进程id
- ppid 属性返回当前父进程的进程ID
- debugPort (可读可写)调试器使用的端口
- exitCode  (可读可写)退出且未指定退出码时，此数值将作为进程的退出码,指定 process.exit(code) 的退出码将覆盖 process.exitCode 的原有设置。
- execPath 返回启动 Node.js 进程的可执行文件的绝对路径名
  ```
    '/usr/local/bin/node'
  ```
- connected 如果node.js的进程时由IPC channel方式创建的，只要IPC channel保持连接，process.connected属性就会返回true。process.disconnect()被调用后，此属性会返回false。process.connected如果为false，则不能通过IPC channel使用process.send()发送信息。

argv例子
```
文件内容
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

启动Node程序
$ node process-args.js one two=three four

输出结果
0: /usr/local/bin/node
1: /Users/mjr/work/node/process-args.js
2: one
3: two=three
4: four
```


## 进程方法
- process.memoryUsage() 查看内存信息
- process.nextTick() 方法将 callback 添加到下一个时间点的队列。 一旦当轮的事件循环全部完成，则调用下一个时间点的队列中的所有回调。 它的效率更高。 它会在事件循环的下一个时间点中触发任何其他 I/O 事件（包括定时器）之前运行。//官方文档解释相当重要。
- process.chdir() chdir方法用于修改Node.js应用程序中使用的当前工作目录
- process.cwd() 进程当前的工作目录
- kill() 该方法接受2个参数，第一个是pid 第二个是将要发送的信号。 eg:process.kill(process.pid, 'SIGHUP'); 当Node.js进程接收到了SIGUSR1，Node.js会启动debugger。
- process.uncaughtexecption() 当应用程序抛出一个未被捕获的异常时触发进程对象的uncaughtExecption事件
- process.send() 如果Node.js进程是通过进程间通信产生的，那么process.send()放发可以用来给父进程发送消息。接收到的消息被视为父进程的ChildProcess对象上的一个'message'事件。
如果Node.js进程不是通过进程间通信产生的，process.send()回事undefined。
eg:
```
say() // 该方法未定义就执行
process.on('uncaughtExecption',function(err){
  console.log('捕获到一个未被处理的错误'，err)
})
```

实不相瞒还是看官方文档比较好


