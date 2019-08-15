# ts类型

## 元组 Tuple

在TS当中数组合并了相同类型的对象，而元组则是合并了不同类型的对象。

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。比如，你可以定义一对值分别为Sting和Number类型的元组
```
let x:[number,string] = [3,'4']
在此例当中 我们定义了 x 为元组，它的值是[3,'4']。它的类型校验是[number,string]。
```

当访问一个越界的元素，它的类型会被限制为元组中每个类型的联合类型
```
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
x[6] = true; // Error, 布尔不是(string | number)类型
```

## 枚举
枚举类型是对JavaScript标准类型的一个补充。向C等其他语言一样，使用枚举类型可以为一组数值赋予友好的名字。

枚举类型通过`enum`关键字来定义
```
enum Days { Sum, Mon, Tue, Wed, Thu, Fri, Sat }
```
枚举成员会被赋值为从0开始递增的数字，同时也会对枚举值到枚举名进行反向映射。
```
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
```

## 枚举项分为两种类型

枚举类型可以分为常数项和计算所得项

当满足以下条件时，枚举成员会被当作是常数
- 不具有初始化函数并且之前的枚举成员是常数。
- 枚举成员使用常数枚举表达式初始化

### 枚举分类 
1.普通枚举与常数枚举的区别

- 常数枚举是使用`const enum`定义的枚举类型
```
const enum Directions {
    Up,
    Down,
    Left,
    Right
}
​
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
```

- 常数枚举会在编译阶段被删除，并且不能包含计算成员。
```
enum Directions { up, down, left, right}
编译结果：
var dir;
(function (dir) {
    dir[dir["left"] = 0] = "left";
    dir[dir["top"] = 1] = "top";
    dir[dir["down"] = 2] = "down";
    dir[dir["right"] = 3] = "right";
})(dir || (dir = {}));

```

```
const enum Directions { up, down, left, right}
没有编译结果 会被删除
```

2.外部枚举

外部枚举是使用declare enum定义的枚举类型

## voild
voild表示没有任何类型,当一个函数没有返回值的时候，可以将其的返回值类型设置为void
```
function warnUser():vaild{
  console.log('This is my warning message')
}
```

## never
never类型表示的是那些永远不存在的值的类型。例如，never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或者箭头函数表达式的返回值类型。

## Object
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