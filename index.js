const fs = require('fs')
const watcher = fs.watch('./message',(eventType,filename)=>{
  if(filename){
    console.log(filename)
  }
  console.log(eventType)
})