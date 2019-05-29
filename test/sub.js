process.on('message', (m) => {
  console.log('子进程收到消息', m);
});

// 使父进程输出: 父进程收到消息 { foo: 'bar', baz: null }
process.send({ foo: 'bar', baz: NaN });