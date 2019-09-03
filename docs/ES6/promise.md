# promise 源码实现
promise的出现解决了代码的异步回调地狱的问题 那么让我们来看看他是如何具体实现的吧。

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
          let x = onFulfilled(that.value); // 在then方法的回调函数中传入promise成功状态时resolve(value)的value值
          resolvePromise(newPromise, x, resolve, reject) //下个小结介绍  
          // 此处传入了参数 当前新建的promise, then方法中返回值, 当前promise当中的resolve，rejcet参数
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
          resolvePromise(newPromise, x, resove, rejcet) 
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