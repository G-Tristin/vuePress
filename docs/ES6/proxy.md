# Proxy(代理)
proxy用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种**元编程**，即对变成语言进行编程。

## proxy实现
ES6原生提供了proxy构造函数，用来生成Proxy的实例
```
var proxy = new Proxy(target, handler)
```
proxy对象的所有用法，都是采用上面的这一种形式，不同的只是handler参数的写法。其中，new proxy()表示生成一个proxy的实例，target参数表示要被拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。

- 注意：
我们设置的handler是针对通过`new Proxy`生成的实例进行的拦截，不是对原对象的操作拦截，除非handler是一个空对象，那么proxy实例将与原对象直通。

- 作用:设置对象方法的链式调用
```
const pipe = function(value){
    let funStack = []
    let handler = {
        get(target, fnName){
            if(fnName === 'get'){
               return funStack.reduce((pre, next) =>{
                    return next(pre)
                },value)
            }else{
                funStack.push(window[fnName])
            }  
            return  proxy
        }
    }
    const proxy = new Proxy({},handler)
    return proxy
}
var double = n => n * 2;
var pow = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;
pipe(3).double.pow.reverseInt.get
```

## Proxy的实例方法

- get 对代理实例属性获取进行拦截
- set 对代理实例的属性设置进行拦截
- apply 拦截代理实例的函数调用、call、apply(此时被代理对象是一个函数)
- 


### apply
该方法接受三个参数，这三个参数分别是目标对象、目标对象的上文（this）、目标对象的参数数组。

### has 
has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法回生效。典型的操作就是in运算符。

- has方法接受2个参数，分别是目标对象和需要查询的属性名

下面的例子使用has方法隐藏某些属性，不被in方法发现
```
const handler = {
    has(target, key){
        if(key[0] === '_'){
            return false
        }
        return key in target
    }
}
var target = {name: 'jan', _age: '30'}
const proxy = new Proxy(target, handler)
```
如果原对象不可配置或者禁止扩,这时has拦截会报错

### construct()
该方法用于拦截new命令

construct方法接受2个参数
- target 目标对象
- args 构造函数的参数对象
- newTarget 创建实例对象时，new命令作用的构造函数

construct方法返回的必须是一个对象，否则会报错
