## UMD库

既可以通过<script/> 标签引入，又可以通过import导入的库，称为UMD库。相比于npm包类型的声明文件，我们需要额外声明一个全局变量，为了实现这种方式，ts提供了新的语法。export as namespace

### export as namespace

一般使用export as namespace时，都是先有了npm包的声明文件，再基于它添加一条export as namespace语句，即可将生命好的一个变量声明为全局变量，举例如下:

```
// type/foo/index.d.ts
exports as namespace foo;
export = foo

declare function foo():string
declare namespace foo(){
  const bar:number
}
```

### 直接扩展全局变量
有的第三方库扩展了一个全局变量，可是此全局变量的类型却没有相应的更新过来，就会导致ts编译报错，此时就需要扩展全局变量的类型。比如扩展string类型。

```
interface String{
  prependHello():string
}
'foo'.prependHell()
```
通过声明合并，使用interface String即可给String添加属性和方法。

也可以使用 declare namespace 给已有的命名空间添加类型声明
```
// type/jquery-plugin/index.d.ts
declare namespace JQuery{
  interface CustomOpitons{ //注意这里是类型声明 不是对象的子对象
    bar:string
  }
}

interface JQueryStatic{
  foo(options:JQuery.CustomOptions):string //此处使用了添加的声明类型
}

// src/index.ts

jQuery.foo({
  bar:''
})
```
