console.log('进程开始')
console.log(process.exitCode = 1)
process.on('exit', (code) => {
  console.log(`退出码: ${code}`);
});