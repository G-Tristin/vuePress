const cp = require('child_process');
const n = cp.fork(`${__dirname}/sub.js`); //返回值是一个'child_Process'
// 返回的是被创建的子进程实例对象
n.on('message', (m) => {
  console.log('父进程收到消息', m);
  // 当前的事件是在子进程的实例对象上绑定的 那为什么说是父进程收到了消息呢?
  // 当前进程仍然是父进程 但是 是在父进程内的子进程实例对象上添加了事件回调 获取到消息 这样实现了进程之间的通信
  // 二个进程还是独立运行的
});
console.log(n)
// 使子进程输出: 子进程收到消息 { hello: 'world' }
n.send({ hello: 'world' }); // 通过在父进程中的子进程实例对象给子进程发送消息