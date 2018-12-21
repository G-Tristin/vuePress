# javascript

## import 与 require的区别

require()方法是commonJS所使用的引用模块的方法，一般用于服务器加载模块.

import 是ES6新增的浏览器加载模块的方法.

### 调用时间

require是运行时调用，所以require理论上可以运用在代码的任何地方

import是编译时调用，但是并不一定需要写在开头，import命令具有提升效果，会提升到整个模块的头部

### 本质

require是赋值过程，其实require的结果就是对象、数字、字符串、函数等，再把require的结果赋值给某个变量

import是解构过程，但是目前所有的引擎都还没有实现import，我们在node中使用babel支持ES6，也仅仅是将ES6转码为ES5再执行，import语法会被转码为require

### 使用场景

- import

import 形式的是es6中新增的语法，大部分浏览器不支持import ，所以要用babel转换成CommonJS规范形式的代码。
CommonJS 是一种模块化规范，浏览器本身也没有require这种语法，是用原生js实现的功能。

- require

Node 中就是以CommonJS规范 为基础，可以直接使用require，但是客户端中却没有require 和 module语法。
babel 对 require是不进行处理的，一般的打包工具都会做好处理，例如fis、webpack。

简而言之就是 import 和 require都可以在浏览器和服务端使用，只要你使用了打包工具进行处理。

## import 比较 require 的优势

使用require加载模块，实质是整体加载fs模块(即会加载fs的所有方法)，然后再读取我们使用到的部分方法。
但是使用import加载模块，实质是从fs模块中加载指定的方法，其他方法不加载，这种加载方式称之为”编译时加载“，或者叫做
静态加载，即ES6可以在编译时就完成加载，效率更高。
