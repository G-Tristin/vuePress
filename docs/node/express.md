# express

## express 中间件

express中间件简介

express中间件将在请求到达服务之后执行，中间件函数一般接收3个参数req，res，next。中间件函数将会对根上的req，res进行操作，即中间件当中
如果对req和res添加了属性，那么之后使用的中间件方法当中都可以在req，res当中访问到这个属性或者方法。

流程:

request ---> Array of request handler functions(middleware) --->response

note:

理论上一个中间件结束后，它必须执行下面二个操作中的一个
- 所有处理结束后，发送res。end或者使用Express中的res。sendFile等函数结束的响应
- 调用next函数调用下一个中间件函数

路由的结束 一般都是发送res。end

## express 路由

路由与中间件在express中是一个不同的概念。路由与中间件类似的地方在于，路由和中间件都会对请求函数进行拆分。不同的是路由会根据请求的URL和HTTP方法来决定处理方式。 可以理解为路由可以让不同的请求映射到不同的处理函数当中。而中间件的话会让所有的请求都通过这个处理函数。

eg:

在我的应用程序中有一个主页和一个留言板页面，他们的请求方式分别为get和post。他们的路由地址也不相同。如果我们使用中间件那么我们不能针对
性的对主页或者留言板发出的请求做出相应的操作(中间件不针对特定的路由会对所有的请求函数进行操作)。但是路由给我们提供了针对特定路由使用不同的请求函数。比如当用户使用get请求去访问用户时，有可能会触发所有的中间件函数，并且会触发针对该路由和该方法的路由函数。

note:

路由和中间件是相辅相成的，中间件当中我们一般会放入比较通用的方法(比如打印日志，错误出路)，路由当中我们会针对某一个路由做出对应的处理函数操作。当我们访问某个路由的时候在路由之前的中间件函数就会执行。

### 捕获查询字符串的方式

eg:
```

var obj = {}
app。get('/search'，function(req，res){
  obj。name = req。query。name
  res。end('hello world')
})
```
千万必要对req。query[attr]进行类型判断，因为它有可能是一个字符串也有可能是一个数组。如果请求参数是?name=jan那么req。query。name是一个字符串但是如果请求参数是一个?name=jan&name=marry。那么req。query。name就是一个数组

## 使用router划分你的app
Router的官方描述是:Router是一个独立于中间件和路由的实例，你可以将Router看做是只能执行中间件和路由的小型应用。并且Express程序本身就内置了Router实例。 但是Router本质上还是一个中间件。

Router的行为与中间件类似，它可以通过app。use()来调用其他的路由实例，换句话说就是可以使用Router将应用划分为几个小的模块。显然对于一些小的应用来说这样做可能是过度的设计，但是一旦app。js路由扩张的太快的话就可以考录使用Router来进行模块的划分。

下面使用一个使用Router分模块开发的实例

app。js:
```
const express = require('express')
const path = require('path')
const app = express()
const staticPath = path。resolve(__dirname， "static");
app。use(express。static(staticPath));//使用静态文件
app。use('/api'，'。/router/api。js')//该app使用一个Router中间件让他托管所有已/api开始的路由(比如api/users)，第一个参数代表
被托管的路由开头，第二个参数代表的是Router实例的引用地址
```

api。js:
```
const express = require('express)
const router = express。Router()
const ALLOWED_IPS = [
    "127。0。0。1"，
    "123。456。7。89"
];
router。use(function(req。res，next){// 注意中间件当中参数才有next 路由当中是没有next的
    let userIsAllowed = ALLOWED_IPS。indexOf(req。ip) !== -1;
    if(!userIsAllowed) {
        res。status(401)。send("Not authorized!");
    } else {
        next();
    }
})
router。get('/'，function(req，res){ //路由当中没有next参数
  。。。
})
router。get('/users'，function(req，res){
  。。。
})
router。post('/users'，function(req，res){
  。。。
})
modeule。export = router
```
其实 Router 与 app。js 在功能上没有任何区别，都是处理中间件和路由。最大的不同在于：Router 只能已模块形式存在并不能独立运行。