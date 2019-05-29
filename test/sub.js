process.on('message', (m) => {
  console.log('子进程收到消息', m);
});

// 使父进程输出: 父进程收到消息 { foo: 'bar', baz: null }
process.send({ foo: 'bar', baz: NaN });
console.log(process)

// 这里是一个子进程但是为什么用process来访问这个子进程呢? 
// 因为在当前文件是由index.js当中采用子进程模块'child_process'开启的node应用程序，由子进程管理。
// 但是我们在当前文件中还是需要使用process进行访问。并且通过fork()产生的子进程将会与父进程产生IPC通道所以可以使用process.send()给父进程发送信息
