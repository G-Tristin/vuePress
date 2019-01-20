# babel

babel是一个javaScript的编译器

主要用于在旧版浏览器或环境中将ES6代码转换成向后兼容的JavaScript版本.

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

## ES5 

由于babel假定代码是在ES5环境中运行的,因此他会使用ES5函数.如果你当前使用的环境不知此ES5或者只支持部分的ES5那么需要使用polyfill来增加这些方法的支持.