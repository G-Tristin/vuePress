# async 
前端的一种解决异步函数的方案。他是generator的语法糖

与generator相比，async具有的优势
- 内置执行器:genetator没有内置的执行器，需要手动不停的执行next()方法
- 更好的语义
- 更广的适用性: yeild命令后面只能是Thunk函数或者Promise对象，而async函数的await命令后面，可以是Promise对象和原始类型的值(数值、字符串、布尔值，它们会被自动转化成promise对象)
- 返回值是Promise

## 返回promise对象
async返回一个promise对象
async函数内部return语句返回的值，会成为`then`方法返回函数的参数
```
async function f(){
    return 'hello world'
}
f().then(res => {
    console.log(res)
}) // hello world
```

## promise对象的状态变化
`async`函数返回的`Promise`对象，必须等到内部所有的`await`命令后面的`promise`对象执行完，才会发生状态的改变，除非遇到`return`语句或者抛出错误

## 错误处理
如果`await`后面的异步操作出错，那么等同于`async`函数返回的Promise对象被reject。
```
async function f(){
    await New Promise((resolve, reject) => {
        throw new Error('出错了')
    })
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
```

## 使用注意点
- promise对象运行的结果有可能是`rejected`,所以最好把`await`命令放在`try...catch`语句当中。
- 多个`await`命令后面的异步操作，若果不存在继发的关系，最好让他们同时触发
```
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()])
利用promise.all的并发性

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;

让函数先直接执行
```
