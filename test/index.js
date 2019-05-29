const cp = require('child_process');
const n = cp.fork(`${__dirname}/sub.js`);

n.on('message', (m) => {
  console.log('父进程收到消息', m);
});

// 使子进程输出: 子进程收到消息 { hello: 'world' }
n.send({ hello: 'world' });