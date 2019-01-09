# 认识命令行
在开发代码的时候我们不可避免的会使用各种命令行的命令,所以我们有必要对命令行进行了解

## commander
概念:

- 命令 ----你想要设置的命令
- 参数 ----argument
- 选项 ----option

eg: 以ls为示例

ls -la ..其中ls代表命令 ..代表参数 -la代表选项(一般选项前面会有/或者- 不同的系统的前缀不一致) 通过这个前缀用来区分是选项还是参数

安装:
```
npm i commander --save
```

使用:
```
const commander = require('commander')
```

当我们给命令行添加参数或者选项的时候它们都会被添加到process.argv当中,我们可以使用commander.parse()来解析这个参数.
commander.parse(process.argv) --->解析命令行中的数据信息
当我们使用这个命令的时候他就会自动的帮我们添加一个-h的选项

eg:  

test.js文件内添加如下代码
```
const commander = require('commander')
commander.parse(process.argv)
```
然后运行node test -h

### 使用commander设置当前脚本的版本
```
const commander = require('commander')
commander.version('1.0.0','-v,--version') //第一个参数是版本号 第二个参数的第一个是选项的缩写 第二个人是选项的全称
```

### 使用commander给当前脚本命令添加选项
commander支持链式的操作 所以我们可以直接在上面代码的基础上进行修改
```
const commander = require('commander')
commander
.version('1.0.0','-v,--version')
.option('-a, --all [a]','参看说明',function(a){ 使用<v>或者[v]的形参 <>代表必传 []代表可选
  //调用该option将会触发这个函数
  console.log(a)
}) // 第一个参数 前面选项的缩写 后面是选项的全称  第二个参数 这个选项的说明
```

### 使用commander给当前脚本命令添加子命令
```
commander
.command('create <dir>')
.option('-a, --add','add a dir')
.action(function(dir){
  console.log('add ' + dir)
})
```
如果不给子命令添加action方法那么该选项(option)将无效

### 使用commander给当前脚本命令添加参数
```
const commander = require('commander')
commander
.version('1.0.0','-v,--version')
.option('-l,--list')
.arguments('<v>')//使用<v>或者[v]的形参 <>代表必传 []代表可选
```

## 如何发布一个全局的包构建脚手架

[文档](https://www.cnblogs.com/vok-think/p/7475073.html)
