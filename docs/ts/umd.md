# UMD库

既可以通过`<script/>` 标签引入，又可以通过import导入的库，称为UMD库。相比于npm包类型的声明文件，我们需要额外声明一个全局变量，为了实现这种方式，ts提供了新的语法。export as namespace

## export as namespace

一般使用export as namespace时，都是先有了npm包的声明文件，再基于它添加一条export as namespace语句，即可将声明好的一个变量声明为全局变量，举例如下:

```
// type/foo/index.d.ts
exports as namespace foo;
export = foo

declare function foo():string
declare namespace foo(){
  const bar:number
}
```


