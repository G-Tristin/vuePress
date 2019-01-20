# babel

babel是一个javaScript的编译器

主要用于在旧版浏览器或环境中将ES6代码转换成向后兼容的JavaScript版本.

babel默认只转换新的JavaScript句法,而不转换新的API,比如Iterator Generator Set Map proxy
Reflect Symbol Promise等全局对象,以及一些定义在全局对象上的方法(比如Object.assign)都不会转码.

## 介绍

babel是一个编译器.编译代码的过程分为三个阶段:解析 转换 生成

解析时babel不执行任何的操作,只是生成一分相同的额代码,我们需要为babel添加一些插件来做一些事情.

对于babel的编译过程,解析是基础,所有语法的转换过程全部由插件完成,不同的插件负责不同的语法转换,将一堆插件组合在了一起就成了预设.

其中官方给出的插件组合以及预设有:
- env
- es2015
- es2016
- es2017
- lastet
- stage-0
- stage-1
- stage-2
- stage-3
- flow
- react
- minify

其中预设babel-preset-env等同于babel-preset-lastet或babel-preset-es2015 + babel-preset-es2016 + babel-preset-es2017.对于一些老项目可能还在使用babel-preset-es2015建议使用babel-preset-env来替换掉.

最常见的预设配置为
```
{
    preset:['env','stage-3']
}
```

## polyfill

为什么使用了babel还要使用ployfill?

因为babel是基于ES5来转换ES6的语法,如果一些浏览器或者环境对ES5的支持程度也比较低的话那么就必须使用ployfill来支持低版本的浏览器

Babel作为编译器,只对语法部分转换

如:
```
[1,2,3].map(n=>n+1)
```

转换后

```
[1,2,3].map(function(n){
    return n+1
})
```

上面代码只是转换了箭头函数语法,但是对数组的新原生方法map没有进行转换

为了支持新的原生对象和方法,需要使用babel-polyfill.就像plugins一样也可以或者选择性地包含所需要的内容.

### 原理
当运行环境中并没有实现的一些方法,babel-polyfill会给其做兼容.但是这样做也有一个缺点,就是会污染全局变量,并且项目打包后体积会增大很多,因为把整个依赖包也搭进去了

### 用法
```
1. npm install --save babel-polyfill
2. 在应用的入口引用,以确保它能够最先加载
   import "babel-polyfill" 
   或者`require('babel-polyfill')`
```

### ES5 

由于babel假定代码是在ES5环境中运行的,因此他会使用ES5函数.如果你当前使用的环境不知此ES5或者只支持部分的ES5那么需要使用polyfill来增加这些方法的支持.

## babel-runtime

babel-ployfill会污染全局对象和内置对象的原型,为了不污染全局对象和内置对象的原型,但是又想使用新鲜的语法.
那么我们可以配合使用babel-runtime和babel-plugin-transform-runtime.
比如当前运行环境不支持promise,可以通过引入babel-runtime/core-js/promise来获取promise,
或者通过babel-plugin-transform-runtime自动重写promise. 一般都是使用自动重写promise.

也许有人会奇怪，为什么会有两个runtime插件，其实是有历史原因的：
刚开始开始只有babel-runtime插件，但是用起来很不方便，在代码中直接引入helper 函数，意味着不能共享，造成最终打包出来的文件里有很多重复的helper代码。
所以，Babel又开发了babel-plugin-transform-runtime，这个模块会将我们的代码重写，如将Promise重写成_Promise（只是打比方），然后引入_Promise helper函数。
这样就避免了重复打包代码和手动引入模块的痛苦。

### 用法
```
1.npm i -S babel-runtime
2.npm i -S babel-plugin-transform-runtime
3.写入`.babelrc`
```

```
{
    "plugin":["transform-runtime"]
}
```

### 不足

babel-runtime 不能转换代码的实力方法,比如这样的代码

```
'!!!'.repeat(3);
'hello'.inculdes('h')
```

这只能通过 babel-polyfill 来转码，因为 babel-polyfill 是直接在原型链上增加方法。
