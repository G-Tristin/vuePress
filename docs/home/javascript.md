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

## NODE_ENV

[文档](https://www.cnblogs.com/tugenhua0707/p/9780621.html)
[文档](https://www.jianshu.com/p/c8f9c61c2f20)

在node中有全局变量process表示当前的node进程.precess.env包含着关于系统环境的信息.但是process.env当中并不存在NODE_ENV这个属性.
NODE_ENV是由用户定义的变量,在webpack中它的用途是判断是生产环境还是开发环境的依据.

- 如何配置环境变量

可以直接在cmd环境配置即可,查看环境变量,添加环境变量,删除环境变量等操作

1.1在window下配置环境变量

```
#node中常用的到的环境变量是NODE_ENV，首先查看是否存在
set NODE_ENV

#如果不存在则添加环境变量
set NODE_ENV=production

#环境变量追加值 set 变量名=%变量名%;变量内容
set path=%path%;C:\web;C:\Tools

#某些时候需要删除环境变量
set NODE_ENV=
```

1.2在mac下配置环境变量

```
#node中常用的到的环境变量是NODE_ENV，首先查看是否存在
echo $NODE_ENV

#如果不存在则添加环境变量
export NODE_ENV=production

#环境变量追加值
export path=$path:/home/download:/usr/local/

#某些时候需要删除环境变量
unset NODE_ENV

#某些时候需要显示所有的环境变量
env
```

note:如果我们在命令行中设置环境变量后，比如设置 production 后，如下设置：
`export NODE_ENV=production `，那么会在所有的项目下都是正式环境，当我们使用命令 npm install 后下载依赖包时，只会把 package.json中的dependencies依赖项下载下来，对于devDependencies中的依赖包是下载不下来的。因此我们需要使用上面的命令 unset NODE_ENV 删除刚刚设置的环境变量。

## 理解webpack当中的插件DefinePlugin含义

官网解释的是：DefinePlugin允许我们创建全局变量，可以在**编译时**进行设置，因此我们可以使用该属性来设置全局变量来区分开发环境和正式环境。这就是 DefinePlugin的基本功能。

因此我们可以在webpack.config.js 中添加如下代码配置全局变量信息了，因为当webpack进行编译的时候会全局设置变量；如下代码：
```
module.exports = {
  plugins: [
    // 设置环境变量信息
    new webpack.DefinePlugin({
      'typeof window': JSON.stringify('object'), //在DefinePlugin插件中typeof会执行并且结果和js一致
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        //该步骤用于获取node进程中的process.env.NODE_ENV 但是mode默认是没有这个属性的 如果我们不设置默认是undefined
      }
    })
  ]
}
console.log('process.env.NODE_ENV 的值是(webpack.config.js)：' + process.env.NODE_ENV)

所以我们需要在package.json执行脚本的时候给node进程加上这个属性(NODE_ENV)

"scripts": {
  "build": "NODE_ENV=production webpack",
  "serve": "NODE_ENV=development webpack"
  //这种通过脚本设置NODE_ENV只会在serve或者build的时候给process.env设置NODE_ENV.进程结束就会删除环境变量的当前属性
},
```

## 阻止事件冒泡和事件捕获

阻止事件冒泡的方式：

1.使用on添加的事件  event.cancelBubble = true;

2.使用addEventListener  event.stopPropagation();

阻止默认事件的方式：

1.使用on添加的事件 return false

2.使用addEventListener event.preventDefault()

## jsonP

[文档](https://zhangguixu.github.io/2016/12/02/jsonp/)

eg：一个简单的jsop的实现

```
function JsonP(params){
  const script = document.createElement('script');
  const head = document.getElementByTagName('head')[0];
  script.src= params.url + `?callback=${params.callback}`
  head.appendChild(script)

}
fn(data){
  console.log(data)
}
JsonP({url:'',callback:fn})
```

当我们调用JsonP的时候回发送请求，请求返回后会调用回调函数，那么为什么请求返回后会调用回调函数呢？

后端服务代码

```
var http = require('http');
var urllib = require('url');
var port = 8080;
var data = {'data':'world'};
http.createServer(function(req,res){
    var params = urllib.parse(req.url,true);
    if(params.query.callback){
        console.log(params.query.callback);
        //jsonp
        var str = params.query.callback + '(' + JSON.stringify(data) + ')';
        //核心在此处 把后调函数返回 并带入数据执行
        res.end(str);
    } else {
        res.end();
    }
    
}).listen(port,function(){
    console.log('jsonp server is on');
});
```

