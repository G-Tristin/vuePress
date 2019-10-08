# generator

`Generator` 函数是 `ES6` 提供的一种异步编程解决方案，语法行为与传统函数完全不同。执行`Generator`函数会返回一个遍历器对象，也就是说，`Generator`函数除了状态机，还是一个遍历器生成函数。返回的遍历器对象，可以依次遍历`Generator`函数内部的每一个状态。形式上，`Generator`函数是一个普通函数，但是有2个特征。一是，`function`关键字与函数名之间有一个星号；二是，函数体内部使用`yield`表达式，定义不同的内部状态(`yield`在英语里的意思就是'产出')。

```
function* helloWorldGenerator(){
    yield 'help';
    yield 'me';
    return 'ending'
}

var hm = helloWorldGenerator();
```

Generator函数的调用方法与普通函数是一样的，也是在函数名后面加上一对圆括号。不同的是，调用`Generator`函数后，该函数不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章节介绍的遍历器对象(Iterator Object)。

也就是说Generator函数调用之后返回的对象是如下形式的:
```
{
    next: function () {
    let value
    if(...){
        value = ...
        done = false | true 
    }
    return { value, done }
    }
}
```
下一步，必须调用遍历器对象的`next`方法，是的指针移向下一个状态。也就是说，每次调用`next`方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式(或者return语句)为止。换言之，Generator函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。

## yield表达式

由于Generator函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield表达式就是暂停标志。

遍历器对象的next方法的运行逻辑如下：
- 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
- 下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式
- 如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句
- 如果该函数没有return语句,则返回对象的Value属性值为undefined.

需要注意的是，yield表达式后面的表达式,只有当调用next方法、内部指针指向该语句时才会执行，因为等于为javascript提供了手动惰性求值的语法功能
```
function *gen(){
    yield 123 + 456;
}
```
上面代码中，yield后面的表达式`123+456`，不会立即求值，只会再next方法将执行移到这一句时，才会求值。

## next方法
`yeild`表达式本身没有返回值，或者说总是返回undefined。`next`方法可以带一个参数，该参数就会被当作上一个`yeild`表达式的返回值。
```
function *f(){
   for(var i=0 ;i< arr.length; i++){
       var reset = yield i
       if(reset){
           i = -1
       }
   }
}
var g = f();
g.next() // { value: 0, done: false}
g.next() // { value: 1, done: false}
g.next(true) // { value :0, done: false}
```

## generator.prototype.throw()
Generator 函数返回的遍历器对象,都有一个throw方法，可以再函数体外抛出错误，然后再Generator函数体内捕获。
```
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b
```
上面代码中遍历器对象i连续抛出2个错误。第一个错误被Generator函数体内的Catch语句捕获。i第二次抛出错误，由于Generator函数体内的捕获语句已经执行过了，不会再次捕捉错误，多以这个错误抛出函数体外了，被函数体外的catch语句捕获。

## Generator.prototype.return
Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且总结Generator
```
function *gen(){
    yield 1
    yield 2
    yield 3
}
var g = gen()
g.next() // { value: 1, done: false}
g.return('foo') //{ value: 'foo', done: true}
g.next() // {value: undefined, done: true}
```

## yield*表达式
ES6提供了yield*表达式，用来再一个Generator函数里面执行另一个Generator函数。
```
function* foo(){
  yield 'a';
  yield 'b';
}
function* bar(){
  yield 'x';
  yield* foo();
  yield 'y';
}

// 等同于
function* bar(){
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar(){
  yield 'x';
  for (let v of foo()){
    yield v;
  }
  yield 'u';
}

// 'x'
// 'a'
// 'b'
// 'y'
```