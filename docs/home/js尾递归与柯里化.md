# 尾递归
函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

递归非常消耗内存，因为需要同时保存成千上百个调用帧，很容易发生堆`栈溢出`错误。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生`栈溢出`错误。因为尾递归会释放出外层的函数的调用帧。

普通的递归
```
function factorial(n){
    if(n === 1) retrun 1 
    return n * factorial(n-1)
}
factorial(5)
```

改写成尾递归
```
function factorial(n, total){
    if(n === 1) return total
    return factorial(n-1, n*total)
}
factorial(5, 1)
```

## 函数柯里化
函数柯里化实质是将多参数的函数转换成单参数的形式。
```
function curring(fn , n){
    return function(m){
        return fn.call(this, m, n)
    }
}
// factorial是上例的尾递归函数
const factoryFn = curring(factorial, 1) 
factoryFn(5)
```

上例是一个函数柯里化的工厂化的用例
- 创建一个柯里化的函数(curring),至少含有2个函数。第一个参数是待柯里化的函数，之后的参数是待柯里化函数中将会使用到的不经常变动的参数。

- curring返回一个新建的函数，该函数用于接受被柯里化函数经常会发生改变函数参数。

- 最后尾调用待柯里化的函数并指定this指向。

