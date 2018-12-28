# koa
koa是一个node框架用于构建一个本地的node服务器

## 使用koa创建服务器
- 引入一个koa模块
- 创建一个koa实例对象
- 使用koa中间件
- 监听端口

示例代码:
```
const Koa = require('koa');
const app = new Koa();
app.use((ctx,next)=>{
  await next();
  ctx.response.type = 'text/html',
  ctx.response.body = '<h1>hello world!<h1>
})
app.listen(8080)
```

## koa middleWare

使用app.use()使用中间件
```
app.use(async (ctx,next)=>{
  await next() // 会等待下一个中间件执行之后再执行下面的代码 所以我们执行异步函数的时候需要注意代码的执行顺序
  ctx.response.type='txt/html'
  ctx.response.body= '<h1> hello world </h1>'
})
```
每接收到一个http请求,koa就会通过app.use()注册的async函数,并传入ctx和next参数

## koa的执行顺序

如果app.use()当中的回调函数是一个异步函数(async)那么如果我们使用了await next(),那么回到函数当中的其他代码就要等到下一个app.use()中的函数执行完成之后再执行

```
const Koa = require('koa')
const app = new Koa();
function log(){
  return new Promise((res,rej)=>{
    setTimeout(function(){
      console.log('a')
    },200)
  })
}
app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
  await next(); // 调用下一个middleware
});

app.use(async (ctx, next) => {
  const start = new Date().getTime(); // 当前时间
  await next(); // 调用下一个middleware
  const ms = new Date().getTime() - start; // 耗费时间
  console.log(`Time: ${ms}ms`); // 打印耗费时间
});

app.use(async (ctx, next) => {
  await next();
  console.log('我出现在Time之前')
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hello, koa2!</h1>';
});
app.listen(8000)
console.log('开启服务器')
```