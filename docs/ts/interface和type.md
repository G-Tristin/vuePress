# interface和type

在Typescript中，我们使用接口(interface)来定义对象的类型

引用一句:

TypeScript的核心原则之一是对值所具有的结构进行类型检查。它有时被称做“鸭式辨型法”或“结构性子类型化”。 
在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

## 相同点

1. 都可以用来描述一个对象或者函数

2. 都允许扩展(extends) 实现的效果差不多但是二者的语法不太相同

## 不同点

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

implement-实现。与C#或者JAVA里的接口的基本作用一样，Typescript也能够用它来明确的强制一个类去符合某种契约

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