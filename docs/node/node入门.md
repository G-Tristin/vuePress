# node入门

## 命令行模式和Node交互模式

命令行模式下可以直接输入node xx.js文件就可以直接在node环境下运行js文件.而使用直接在命令行输入node将进入到Node交互环境.
在node交互环境我们可以运行js代码并且会直接输出结果,如果我们通过命令行模式 即通过node xx.js来运行js代码,则必须通过在改js文件
当中通过console.log(),把我们想要的结果打印出来.

## commonJs规范

当我们使用require引入一个模块时,如果没有明确的写明模块的路径

比如:
```
const greet = require('greet')
```
那么node会首先从内置模块当中找(即:node_modules)然后在全局的模块当中查找最后再从当前的路径当中查找

### CommonJS规范简介

在这个规范下，每个.js文件都是一个模块，它们内部各自使用的变量名和函数名都互不冲突，例如，hello.js和main.js都申明了全局变量var s = 'xxx'，但互不影响。

一个模块想要对外暴露变量（函数也是变量），可以用module.exports = variable;，一个模块要引用其他模块暴露的变量，用var ref = require('module_name');就拿到了引用模块的变量。
