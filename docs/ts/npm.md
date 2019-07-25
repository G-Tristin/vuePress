## 在typescript当中使用npm包

一般我们通过 import foo from 'foo' 导入一个npm包，这是符合ES6规范的。

在我们尝试给一个npm包创建声明文件的之前，需要看看它的申明文件是否存在。一般来说，npm包的声明文件就存在2个地方。

1. 与改npm包绑定在一起。判断依据是package.json种有types字段，或者拥有一个index.d.ts声明文件。这种模式不需要额外的安装其它包，是
最为推荐的，所以以后我们自己要创建npm包的时候，最好也将申明声明文件和npm包绑定在一起。

2. 发布到@types里。我们只需要尝试安装一下对应的@types包就知道是否存在该声明文件，安装命令是 npm install @types/foo --save-dev。这种模式
一般是由于npm包的维护者没有提供声明文件，所以只能由他人来将声明文件发布到@types里了

假如以上两种方式都没有找到对应的文件，那么我们就需要自己为它书写声明文件了。由于是通过import语句导入的模块，所以声明文件存放的位置也有所束缚，
一般有2种方案。

1. 创建一个node_modules/@types/foo/index.d.ts文件，存放foo模块的文件。这种方式不需要二外的配置，但是node_modules目录不稳定，代码也没有保存到仓库当中，无法回溯版本，有者不小心被删除的风险，故不太建议使用这种方案，一般只是用作临时测试。

2. 创建一个types目录，专门用来管理自己写的申明文件，将foo的声明文件放到types/foo/index.d.ts中。这种方式需要配置下tsconfig.json中的path和baseUrl字段。
```
tsconfig的内容
{
    "compilerOptions": {
        "module": "commonjs",
        "baseUrl": "./",
        "paths": {
            "*": ["types/*"]
        }
    }
}
```

如此配置之后，拖过import导入foo的时候，也会去types目录下寻找对应的模块声明文件了。

注意module配置可以有很多种选项，不同的选项会影响模块的导入导出模式。这里我们使用了commonjs这个最常用的选项，后面的教程也都默认选用这个选项。

### npm 包的声明文件和全局变量的申明文件存在很大的区别。

在npm包的声明文件中，使用declare不会再声明一个全局变量，而只会在当前文件中声明一个局部变量。只有在声明文件当中使用export导出，然后在使用方inport导入后，才会应用到这些类型声明。

npm包的声明文件主要有一下几种语法:

1. export 导出变量
2. export namespace 导出(含有子属性的)对象
3. export default ES6默认导出
4. export= commonjs 导出模块

#### export 的语法和普通的js中的语法类似，区别仅在于声明文件中禁止定义具体的实现
```
export const name:string
export function getname():string
export class Animal {
    constructor(name: string);
    sayHi(): string;
}
export enum Directions {
    Up,
    Down,
    Left,
    Right
}

// 注意以下是导出声明类型
export interface Options {
    data: any;
}
```
对应的导入和使用模块应该是这样:
```
// src/index.ts
import { name, getName, Animal, Directions, Options } from 'foo';
console.log(name);
let myName = getName();
let cat = new Animal('Tom');
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
let options: Options = {
    data: {
        name: 'foo'
    }
};
```
#### 混用declare和export 

我们也可以使用decalre先声明多个变量，最后再一次性导出。上文的声明文件可以等价的改写为:
```
// types/foo/index.d.ts

declare const name:string
declare function getName():string
declare class Animal{
  constructor(name:string)
  sayHi():sting
}

declare enum Directions{
  up,
  Down,
  Left,
  Right
}

interface Options{
  data:any
}

export(name,getName,Animal,Directions,Options)
```

注意与全局变量的声明文件类似，interface 前提不需要declare的。

#### export namespace 

与declare namespace类似，export namespace用来导出一个拥有子属性的对象
```
// type/foo/index.d.ts

export namespace foo{
  const name:string
  namespace bar {
    function baz():string;
  }
}

// src/index.ts
impor {foo} from 'foo';
console.log(foo.name);
foo.bar.baz();
```

##### declare namespace 与 export namespace 以及 interface的区别
declare namespae 在全局的声明文件中 声明一个全局的 拥有子对象的变量对象

export namespace 导出一个拥有子对象的变量对象

interface 声明一个接口 这个接口一般用来描述对象


#### export default 
导出默认模块 但是只有function class和interface可以默认导出

