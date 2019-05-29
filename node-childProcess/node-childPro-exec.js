const fs = require('fs');
const child_process = require('child_process');
for (var i = 0; i < 3; i++) {
 //这里有空格请注意。分别代表node路径 node-childPro.js路径 i第几个进程。 node-childPro.js中的process.argv可以获取这些信息值
 var childProcess = child_process.exec('node node-childPro.js '+ i,
 // 回调函数 子进程的输出以回调函数参数的形式返回
 function (error, stdout, stderr) {
  if (error) {
  console.log(error.stack);
  console.log('Error code: ' + error.code);
  console.log('Signal received: ' + error.signal);
  }
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
 });
 childProcess.on('exit', function (code) {
 console.log('子进程已退出，退出码 ' + code);
 });
}