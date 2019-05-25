# js-context
[学习地址](https://juejin.im/post/5bdfd3e151882516c6432c32)

## 执行上下文总共分为三种类型

函数执行上下文

全局执行上下文

eval执行上下文(不常用)

## 执行栈
执行栈在其他编程语言当中也被叫做调用栈，具有LIFO(先进后出)的结构，执行栈用于存储代码在执行时期创建的所有上下文

当javascript首次读取脚本时会创建一个全局的上下文放入到执行栈中，每当一个函数调用就会产生一个新的执行上下文，将它放入到执行
栈的顶层，当函数运行完毕之后，将该执行上下文从执行栈中弹出然后将当前控制权移交给执行栈中的下一个执行上下文。

## 上下文的创建阶段会发生三件事

1.确定this  也称为this绑定

2.词法环境被组建

3.变量环境被组件 

上下文的概念就可以认为时由上面的三部分组成

## 词法环境

定义:
>词法环境是一种规范类型，基于ECMAScript代码的词法嵌套结构来定义标识符与特殊变量和函数的关联关系。词法环境有环境记录和可能为null的外部词法环境组成。

大意为:词法环境是一个包含标识符变量映射的结构（标识符:变量/函数的名称 变量:是对实际对象或者原始值的引用）

词法环境又可以分为两种类型

1.全局环境:(在全局上下文中)是一个没有外部环境的词法环境。全局词法环境的外部环境引用为null。它拥有一个全局对象，以及其关联的属性和方法，以及任何用户
自定义的方法，它的this只想为golbal(浏览器环境下为window)

2.函数环境:用户在函数当中定义的变量和函数都存储在环境记录当中，对外部环境的引用可以是全局环境也可以时别的函数环境。并且它的环境记录当中还有一个
arguments对象，该对象包含了索引和传递给函数的参数之间的映射以及传递给函数的参数的长度（数量）。


### 组成
词法环境由两部分组成:

1.环境记录:存储变量和函数的实际位子

2.对外部环境的引用: 对外部环境记录的引用 可以访问外部的变量

### 环境记录 

环境记录分为两种类型

1.声明性环境记录  一般函数环境对应声明性环境记录 包含函数声明以及变量

2.对象环境记录 全局环境对应对象环境记录 包含全局上下文当中出现的函数和变量申明

抽象的表示词法环境
```
GlobalExectionContext = {  
  LexicalEnvironment: {  
    EnvironmentRecord: {  
      Type: "Object",  
      // 标识符绑定在这里 
    outer: <null>  
  }  
}

FunctionExectionContext = {  
  LexicalEnvironment: {  
    EnvironmentRecord: {  
      Type: "Declarative",  
      // 标识符绑定在这里 
    outer: <Global or outer function environment reference>  
  }  
}
```

### 变量环境

它也是一个词法环境，其 EnvironmentRecord 包含了由 VariableStatements 在此执行上下文创建的绑定。

在ES中词法环境和变量环境的区别时词法环境用于存储由let和const声明的变量以及函数声明，而变量环境则是包含了var声明的变量

为了更好的理解以及区别请看下面示例代码
```
let a = 20;  
const b = 30;  
var c;

function multiply(e, f) {  
 var g = 20;  
 return e * f * g;  
}

c = multiply(20, 30);
```

执行上下文代码
```
GlobalExectionContext = {

  ThisBinding: <Global Object>,

  LexicalEnvironment: {  
    EnvironmentRecord: {  
      Type: "Object",  
      // 标识符绑定在这里  
      a: < uninitialized >,  
      b: < uninitialized >,  
      multiply: < func >  
    }  
    outer: <null>  
  },

  VariableEnvironment: {  
    EnvironmentRecord: {  
      Type: "Object",  
      // 标识符绑定在这里  
      c: undefined,  
    }  
    outer: <null>  
  }  
}

FunctionExectionContext = {  
   
  ThisBinding: <Global Object>,

  LexicalEnvironment: {  
    EnvironmentRecord: {  
      Type: "Declarative",  
      // 标识符绑定在这里  
      Arguments: {0: 20, 1: 30, length: 2},  
    },  
    outer: <GlobalLexicalEnvironment>  
  },

  VariableEnvironment: {  
    EnvironmentRecord: {  
      Type: "Declarative",  
      // 标识符绑定在这里  
      g: undefined  
    },  
    outer: <GlobalLexicalEnvironment>  
  }  
}
```
当中我们会发现let和const声明的变量没有任何与之关联的值，而var声明的变量有undefined与之对应,
应为在上下文的创建阶段会有一个预解析的过程，其中函数声明会被存储在环境中而变量会被赋值为undefined(var的情况下)或者保持初始化(let和const的情况下)
这就是为什么var可以在声明之前访问而let或者const则不能在声明之前访问。这就是所谓的变量提升

