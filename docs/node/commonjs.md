# commonJs

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

## commonJs与ES的模块化的区别

1.commonJs是在代码的执行阶段加载的而ES6的模块化是在静态编译的时候就引入了模块接口。所以ES6不知此动态加载。因为动态加载意味则会在代码的执行阶段去引入模块这和ES6模块化的实现方式不同。

eg:
```
import {a} from `${a}b.js`
a+b必定实在运行时加载输出结果 在编译时是无法得知结果的 所以ES6无法引入该模块
```
2.commonJs是值的复制 而ES6的模块化是地址的引用

### CommonJS规范简介

在这个规范下，每个.js文件都是一个模块，它们内部各自使用的变量名和函数名都互不冲突，例如，hello.js和main.js都申明了全局变量var s = 'xxx'，但互不影响。

一个模块想要对外暴露变量（函数也是变量），可以用module.exports = variable;，一个模块要引用其他模块暴露的变量，用var ref = require('module_name');就拿到了引用模块的变量。

### exports与module.exports

module.exports可以如下方法理解：
module是commonJs对外暴露的模块对象，而模块对外暴露的属性和方法则被赋值给了module下的exports属性。
所以我们可以把我们想要对外输出的变量或者方法 直接赋值给module.exports

eg:
```
如果我们将一个变量或者函数直接赋值给module.exports
// a.js
const str = 'str'
module.exports = str
---
const string  = require('a.js')
console.log(string) // str

如果我们给module.exports设置一个属性
// b.js
module.exports = {
  name:'a'
}
--
const name = require('b.js')
console.log(name) // {name:'a'}
```

而exports是一个辅助工具，它相当于是exports = module.exports。从而获取到了module.exports的地址引用

所以我们可以给exports赋予属性，相当于给module.exports添加属性和方法。但是不能给exports直接赋值，如果给它直接
赋值，将会造成exports的应用地址与module.exports的地址断开，而CommonJs模块下暴露出去的模块对象的属性是module.export
所以给exports直接赋值将会导致不再对外暴露出去属性和方法。
