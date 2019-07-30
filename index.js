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