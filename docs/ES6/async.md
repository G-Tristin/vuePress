# async
async与generator的区别:
generator是一个遍历器生成函数。我们可以通过使用遍历器的特性(只有执行遍历器的next方法generator函数里面的代码才会从上一个yeild方法处执行下一段代码)，
通过这个特性我们可以用它来写异步执行的函数(yeild 异步函数，使依赖它的代码只有当next()方法执行后才能够执行到，而我们可以在promise的回调中执行next方法来获取异步的依赖代码) 可以用来解决回调地狱或者promise的长链接代码
而saync自带执行器不需要我们手动的调用next()函数