# 如何发布包

[文档](https://www.cnblogs.com/vok-think/p/7475073.html)

注:第一个文档当中有一个错误 就是"bin"字段后面应该是一个对象

[官方文档](https://www.npmjs.cn/)

## 发布一个自定义包的步骤

- 通过npm init -y 创建一个默认的page.json文件

```
name:  vsv  // 模块名称
version: (1.0.0) 1.0.1 // 基础版本号
description: 描述 // 模块描述
entry point: (index.js) index.js // 默认入口
test command: none // 测试指令
git repository: https://github.com/vok123....  // 个人git仓库地址
keywords: server // 关键字
author: vok // 作者
license: (ISC) //默认值
```

- 在该目录下创建功能型文件或者文件夹(包含功能型文件),并将功能型代码的API导出模块

- 在同级目录下创建一个index.js文件,该文件的作用引入功能型文件(单个或多个有利于模块化开发),并将其导出.

- 最好写一个README.md文件来说明包的使用方法和作用

### publish发布代码的注意事项

- 切换包的源地址到npm

- 确认有npm的账户

- 通过npm login登录

## 通过发布包来自定义命令

我们可以使用自定义的命令来实现制作自己的脚手架等等

### 如何自定义命令

- 编辑package.json文件

加入"bin"字段

```
{
  "name": "tristan-page",
  "version": "1.0.10",
  "description": "",
  "main": "index.js",
  "bin":{"jan":"./bin/host.js"}, // 是一个对象类型的json.jan代表命令名称 后面代表要执行的文件 全局安装必备
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "G-tristan",
  "license": "ISC",
  "dependencies": {
    "commander": "^2.19.0"
  }
}
```

- 创建生成命令的文件(在node中我们一般使用commander包来编辑命令 下载commander要使用 -S 因为这个依赖被包内部应用只有使用-S才能会下载包的时候把这个模块带上)
  
在目前使用的例子当中,我先在同级目录下创建了一个bin的文件夹,里面包含了一个定义命令行的文件host.js, 注意我们要告诉系统这个host文件是使用node执行的所以这个文件必须添加 #!/usr/bin/env node

```
#!/usr/bin/env node
const program = require('commander')
program
  .version(require('../package').version)
  .option('-p, --port [port]', 'Input port!')
  .parse(process.argv)
console.log(program.port)
```

- 发布之后全局安装这个包 -g

- 使用命令 jan -p 8999