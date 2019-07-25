# ts学习记录

## ts类型

### 元组 Tuple

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。比如，你可以定义一对值分别为Sting和Number类型的元组
```
let x:[number string]
```

当访问一个越界的元素，会使用联合类型代替
```
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
x[6] = true; // Error, 布尔不是(string | number)类型
```

### 枚举
enum类型是对JavaScript标准类型的一个补充。想C等其他语言一样，使用枚举类型可以为一组数值赋予友好的名字

#### 枚举分类 
1.普通枚举与常数枚举的区别

常数枚举会在编译阶段被删除，并且不能包含计算成员。并且常数枚举的声明方式和普通枚举的声明方式也不相同，常数枚举通过 const enum来定义枚举类型

2.外部枚举

外部枚举是使用declare enum定义的枚举类型

### voild
voild表示没有任何类型,当一个函数没有返回值的时候，可以将其的返回值类型设置为void
function warnUser();vaild{
  console.log('This is my warning message')
}

### never
never类型表示的是那些永远不存在的值的类型。例如，never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或者箭头函数表达式的返回值类型。

### Object
Object 表示非原始类型，也就是除了Number，String,boolean,symbol,null或undefined之外的类型。

## 类型断言

有时候你可能会遇到这样的情况，你会比TypeScript更加了解某个值的详细信息。通常这回发生在你清楚的知道一个实体具有比他现有类型更加确切的类型。

用法:
```
我们确实需要在还不确定类型的时候就访问其中一个类型的属性或方法，TS会报错
function getLength(something: string | number): number {
    if (something.length) {
        return something.length;
    } else {
        return something.toString().length;
    }
}
当我们访问一个联合类型的变量是，应为变量的类型可能是字符串或者是数字
所以使用something.length时TS会报错(数字没有长度属性)。 此时我们可以使用类型断言 断言something就是一个字符串 TS就不会报错了
function getLength(something: string | number): number {
    if ((<string>something).length) {   
        return (something as string).length;
    } else {
        return something.toString().length;
    }
}
```

### interface和type的用法

#### 相同点

1. 都可以用来描述一个对象或者函数

2. 都允许扩展(extends) 实现的效果差不多但是二者的语法不太相同

#### 不同点

1. type可以而interface不可以

type 可以申明基本类型别名、联合类型、元组等类型

```
// 基本类型别名
type Name = string

// 联合类型

interface dog {
    wang()
}

interface cat {
    miao()
}

type Pet = dog | cat 

// 具体定义数组每个位置的类型

type PetList = [dog , Pet]
```

2. interface可以但是type不行

interface能够申明合并
```
interface User{
    name:string,
    age:number
}

interface User{
    sex:string
}

let Jim:User = {
    name:'Jim',
    age:20,
    sex:'mail'
}
```

interface有可选属性和只读属性


### 实现与继承

extends很明显就是ES6里面的类继承，那么implement又是做什么的呢?它和extends有什么不同?

implement,实现。与C#或者JAVA里的接口的基本作用一样，Typescript也能够用它来明确的强制一个类去符合某种契约

implement基本用法:
```
interface IDeveloper{
    name:string,
    age?:number
}

correct
class dev implement IDeveloper{
    name:'js',
    age:26
}

err 
class dev2 implement IDeveloper{
    name:'js',
    sex:'mail'
}
```

### declare namespace

namespace 是ts早期时为了解决模块化而创造的关键字又称为命名空间，namespace被淘汰了，但是在申明文件中，declare namespace还是比较常用的，它
用来表示全局变量是一个对象，包含很多子属性。

如果对象拥有深层的层级，则需要用嵌套的namespacel来声明深层的属性的类型
```
// src/jQuery.d.ts
declare namespace jQuery{
    function ajax(url:string,setting?:any):void;
    namespace fn{
        function extend(objcet:any):viod;
    };
}

jQuery.ajax('/api/ger_something');
jQuery.fn.extend({
    chenck:function(){
        return this.each(function(){
            this.check = true
        })
    }
})
```

假如jQuery下仅有fn这一个属性(没有ajax等其它属性和方法)，则可以不需要嵌套namespace
```
declare namespace jQuery.fn{
    function extend(object.any):void
}

jQuery.fn.extend({
    check:function(){
        return this.each(function(){
            this.checked = true
        })
    }
})
```

除了全局变量之外，可能有一些类型我们也希望能够暴露出来。在类型声明文件当中，我们可以直接使用interface或者type来申明一个全局的接口或者类型。
```
interface AjaxSettigs{
    methods?:'GET'|'POST'
    data?:any
}
以上是申明了一个全局的类型

declare namesapce jQuery{
    function ajax(url:sting,settings?AjaxSettigs):void
}
以上是申明了一个全局变量
```
