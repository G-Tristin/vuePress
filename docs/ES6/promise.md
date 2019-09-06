# promise 源码实现
promise的出现解决了代码的异步回调地狱的问题 那么让我们来看看他是如何具体实现的吧。个人认为理解promise状态机的主要核心在于reslovePromise用于处理then方法返回的Promise。以及用于存放状态为成功或者失败时的需要执行的回调函数的数组。

## 一个简单的promise
```
const p = new Promise((resolve, reject) => {
  if(...){
    resolve('a')
  }
  if(...){
    reject('b')
  }
}).then( res => {
  console.log(res)
}, err => {
  console.log(err)
})
```
## promise的实现
```
// 三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECT = 'reject'

function Promise(fn){
  let that = this
  const that.status =  PNEDING // 起始状态为PENDING
  const that.value = undefined // 成功时返回的结果
  const that.reason = undefined // 失败时返回的原因
  that.onFulFilledCallbacks = [] // 所有成功时执行的回调函数数组
  that.onRejectedCallbacks = []  // 所有失败时执行的回调函数数组

  function resolve(value){
    if(value instanceof Promise){
      return value.then(resolve,reject)
    }
    setTimeout(()=>{
      if(that.status === PENDING){
        that.status === FULFILLED
        that.value = value
        that.onFulFilledCallbacks.forEach(cb =>cb(that.value))
      }
    })
  }

  function reject(reason){
    setTimeout(() => {
      if(that.stauts === PENDING){
        that.status = REJECT
        that.reason  = reason
        that.onRejectedCallbacks.forEach(item => item(that.reason))
      } 
    })
  }

  try{
     // 执行我们传入的回调函数并且参数resolve,rejcet在Promise的构造函数当中已经定义好了
     // 这就是为什么我们一定要传参数resolve,reject的原因
    fn(resolve,reject)
    // resolve详解
    // fn中的参数变量reslove会在该函数作用域中找值，对应到Promise构造函数中定义的resolve函数
    // 而fn函数执行时，它内部的必然会执行一次函数resolve或者函数rejcet，并且有可能会传递参数。
    // 如:在我们最上面的例子中传递了参数'a'，这个值a就是在执行reslove时的参数value了。
  }catch(err){
    reject(err)
  }
}
```

## promise.then实现
```
Promise.prototype.then = function(onFulfilled,onRejected){
  const that = this
  let newPromise
  onFulFilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejceted === 'function' ? onRejected : reason => { throw reason};

  if(that.status === FULFILLED){
    // promise 状态为已完成
    return newPromise = new Promise((resolve, reject) => { // 返回值依旧是一个promise
      setTimeout( () => { // 用定时器的目的是保证promise是一个异步的方法
        try{
          let x = onFulfilled(that.value); 
          // that.value就是当前promise为成功状态传递的实参，同时传递给then方法的成功回调的参数。
          
          resolvePromise(newPromise, x, resolve, reject) 
          // resolvePromise -- 专门用来改变then方法新建出来的promise的状态
          // then方的返回值是一个新的Promise并且他的状态参数传入到resolvePromise当中，所以它的状态将由resolvePromise来改变

        } catch(e){
          rejcet(e) // 抛出错误
        }
      })
    })
  }

  if(that.status === REJECTED){ // 状态为失败
    return newPromise = new Promise((resolve,rejcet) => { // 返回一个新的promise
      setTimeout(() => { // 保证Promise是一个异步函数
        try{
          let x = onRejected(that.reason); // then方法的第二个回调一般时错误回调
          resolvePromise(newPromise, x, resolve, rejcet) 
        } catch(e){
          reject(e)
        }
      })
    })
  }  

  if(that.status === PENDING){ // 状态为进行中
    return newPromise = new Promise((resolve, rejcet) => { // 返回一个新的Promise
      // 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中
      that.onFulfilledCallbacks.push((value) => { 
        try {
          let x = onFulfilled(value); 
           // 该步骤往当前promise实例的成功回调函数组中添加回调函数
           // 关于value值由于此时当前的promise的状态还是进行中所有还不存在实参value这里只是一个形参
          resolvePromise(newPromise, x, resolve, reject)
        } catch(e) {
          rejcet(e)
        }
      })

      that.onRejectedCallbacks.push((reason) => {
        try {
          let x = onRejected(reason);
          resolvePromise(newPromise, x, resolve, reject);
        } catch(e) {
          reject(e);
        }
      })
    })
  }  
}
```

## resolvePromise的实现
```
function resolvePromise(promise2, x, resolve, reject){
  if(promise2 === x){ // 避免循环引用
    return rejcet(new TypeError('循环引用'))
  }
  let called = false; // 避免被多次调用
  if(x instanceof Promise){ 
    // 如果then方法中传入的参数的返回值依然是一个promise
    // 注意此时的Promise以及在执行
    if(x.status === PENDING){
        // 如果x的状态为PENDING呢? 即可以理解为.then方法中第一个参数函数的返回值是一个promise并且其状态还未改变的情况。
        
      x.then(y => {
        resovlePromise(promise2, y, resolve, reject) 
      }, reason => {
        reject(reason)
      })
    } else {
      // 当状态为成功或者失败时 注意此时x这个promise已经resolve或者reject掉了
      // 那为什么还要调用x.then呢?
      // 因为我们在第一次(或上一次)创建出来的promise的状态还没有被修改掉，所以现在需要通过then方法把它的状态修改掉
      // 但是每调用一次then方法就会产生一个新的Promise，然而在then方法中又会调用一次resolvePrmise方法把新创建出来的Promise的状态改变掉，
      这样可以达到循环改变promise的状态的效果直到返回值不再是promise时，整个循环全部结束。
      // 注意此时传入的resolve, reject是Promise2的resolve, rejcet参数用于改变then方法返回的Promise的状态。
      x.then(resolve, reject)
    }
  } else if (x != null && ((typeof x === 'object') || (typeof x ==='function'))){
    try{ // 是否是thenable对象(具有then方法的对象/函数)
      let then = x.then
      if(typeof then === 'function'){
        then.call(x, y => {
          if(called) return
          called = true
          resolvePromise(promise2, y, resolve, reject)
        },reason => {
          if(called) return;
          called = true;
          rejcet(reason)
        })
      } else { // 说明是一个普通对象/函数
        resolve(x)
      }
    } catch(e) {
      if(called) return;
      called = true
      reject(e)
    }
  } els {
    resolve(x)
  }
}
```

## 问题与思考

- resolvePromise这个函数的意义是什么?
resolvePromise的意义在于改变通过then方法创造出来promise的状态。并且保证该状态在then方法里面的参数函数的状态不为等待时，才改变当前then方法创造出来的promise的状态。这也就是为什么当我们在then方法的参数函数里面放入新的Promise时，then返回的Promise总是等待参数函数内的promise方法状态改变后才触发。

- Promise中含有异步代码的执行流程?
来看一下当前的实例
```
const P = new Promise((resolve, rejcet) => {
  setTimeOut(() => {
    resolve('a')
  },1000)
})
.then(() => {
  return new Promise((resolve, rejcet) = > {
    setTimeOut(() => {
      resolve('b')
    },1000)
  })
})
.then( () => b)
```
- 注意：
1. promise声明之后就会执行
2. then方法是在promise执行之后执行(不是在promise的状态改变后才执行)

在此例当中P执行之后马上执行它的then方法并且此时它的status还是PENDING(只有在2秒后定时器执行了才会让resolve()执行改变其状态)，所以此时执行的then(称为then1))执行的代码就是`that.status === PENDING`时的方法，此时它往实例对象P的`onFulFilledCallbacks`属性(数组)里面添加then方法的第一个参数函数，并且返回一个新的Promise实例，我将它称为P2。然后第二个then(称为then2))方法执行，此时P2的状态也为PENDING，那么就会往P2的`onFulFilledCallbacks`属性当中添加then2的第一个参数函数。1秒钟后P当中的异步函数执行把P的状态改为FULFILLED,并且循环P的`onFulFilledCallbacks`数组将它内部的参数函数都执行，此时P当中只有一个函数就是then1当中的第一个参数函数。就是如下函数:
```
(value) => {
  try {
      let x = onFulfilled(value);
      resolvePromise(newPromise, x, resolve, reject);
  } catch(e) {
      reject(e);
  }
}
```
`x = onFulfilled(value)` value指代P当中resolve时传入的参数,resovlePromise就是在上一个问题说明的用于改变then方法创建出来的Promise的函数。此时在resolvePromise当中放入then1第一个参数函数的返回值就是一个新的Promise(x)与then1方法创建出来的newPromise(P2)。该promise(x)的状态为PENDING(因为他要在1秒钟后才会执行)。此时resolvePromise检测到x的状态为PENDING，就会继续执行它的x.then方法对应的代码就是:
```
if (x.status === PENDING) {
  x.then(y => {
      resolvePromise(promise2, y, resolve, reject);
      // promise2 用于判断是否和y相等 避免循环应用
  }, reason => {
      reject(reason);
  })
}
```
x.then方法的执行时prmoise还是PENDING(因为这部分为同步代码)，所以又会创建出一个Promise(P4)并且往x的`onFulFilledCallbacks`属性当中添加以下函数
```
取名为fn

y => {
  resolvePromise(promise2, y, resolve, reject);
}
```
假定时间过了1s于是then1当中的参数函数返回的promise(x) resolve掉了(即x的状态变更为FULFILLED)。那么它就会执行它的`onFulFilledCallbacks`里面的回调函数就是fn y的值就是该promise(x)resolve时传入的参数。由于此时的Y是一个普通对象所以就直接执行`resolve(y)`即把P2的状态更新为FULFILLED。到此2个含有异步操作的promise(P,x)已经执行完成，最后改变P2的状态

总结：当promise当中含有异步代码时，当调用它的then方法时，他会往自身的onFulFilledCallbacks内添加回调函数，当异步调用时就会给把回调函数执行。当then方法的参数函数当中返回一个新的promise时，并且返回的promise当中含有异步代码的时候，此时该promise的状态为PENDING那就会往该promise实例的`onFulFilledCallbacks`里面添加一个用于处理then方法返回的Promise的函数就是上面的fn函数,并且fn的参数里面的resovle，rejcet就是then方法返回的(创建的)Promise()的透传的resolve, reject参数，所以可以改变它的状态。保证参数函数中返回的promise的状态改变顺序在then方法返回的promise之前。


- 为什么当调用resolve(或reject)函数时，要把所有的onFulfilledCallbacks里面的所有函数都执行一遍?
因为可能会多次调用同一个promise下面的then方法
```
let a = new Promise

a.then()

a.then()

a.then()
```