# class 继承

Class 可以通过extends关键字实现继承

```
class Point {
    ...
}

class ColorPoint extends Point{
    constructor(x,y,color){
        super(x,y) //调用父类的constructor方法
        this.color = color //子类自己的属性
    }
    toString(){
        return this.color + '' + super.toString() //调用父类的toString()方法
    }
}
```

## super

在类的继承当中super关键字代表着父类的构造函数,用来新建父类的this对象

子类必须在constructor方法中调用super方法,否则新建私立时会报错,因为子类自己的this对象,必须先通过父类的构造函数
完成塑造,得到与父类同样的实例属性和方法,然后对其进行加工,加上子类自己的实例属性和方法.如果不调用super方法,子类就得不到this对象.

原理:

ES5的继承,实质上是先制造子类的实例对象this,然后再将父类的方法添加到this上面(Parent.apply(this)).ES6的继承机制完全相同,实质是先将父类实例对象的属性和方法,加到this上面(所以必选先调用super方法),然后再用子类的构造函数去修改this.

如果子类没有定义constructor方法,这个方法会被默认添加,代码如下.也就是说,不管有没有显示定义,任何一个子类都有constructor方法.并且在里面调用了super

```
class ColorPoint extends Point{
}
//等同于
class ColorPoint extends Point{
    constructor(..args){
        super(...args)
    }
}
```
note:

在子类的构造函数当中,只有调用super之后,才可以使用this关键字,否则会报错.这是因为子类实例的构建,基于父类实例,只有super方法才能调用父类实例

```
class Point{
    constructor(x,y){
        this.x = x
        this.y = y
    }
}

class ColorPoint extends Point{
    constructor(x,y,color){
        this.color = color;//error
        super(x,y);
        this.color = color//正确 必须先调用super然后使用this
    }
}
```

## 静态方法

父类的静态方法也会被子类继承 这个与ES5是不同的
```
class A{
    static hello(){
        console.log('hello world')
    }
}

class B extends Class A {
}
B.hello //'hello world'
```

## 判断子类是否继承自另一个类
Object.getPrototypeOf() 该方法可以获取到子类的父类
Object.getPrototypeOf(ColorPoint) // Point

## super详解

super关键字存在着两种用法,既可以当函数使用也可以当对象使用.在这两种情况下,它的用法完全不同

- 第一种

super作为函数调用时,代表父类的构造函数.ES6要求,子类的构造函数必须执行一次super函数

```
class A {}
class B extends class A{
    constructor(){
        super();
    }
}
```

note:super虽然代表类父类A的构造函数,但是返回的是子类B的实例,即super内部的this指的是B,因此super()在这里相当于
A.prototype.constructor.call(this)

- 第二种

super作为对象时,在普通方法中,指向父类的原型对象;在静态方法中,指向父类
```
class A{
    p(){
        return 2
    }
}

class B extends class A {
    constructor(){
        super()
        consolo.log(super.p()) //此时super指向A.prototype 所以
    }
}
```

注意定义在父类实例上的方法无法访问,因为super代表的是原型 所以实例上的方法无法访问 如下

```
class A {
  constructor() {
    this.p = 2;
  }
}

class B extends A {
  get m() {
    return super.p;
  }
}

let b = new B();
b.m // undefined
```

如果super作为对象,用在静态方法当中,这是super指向父类,而不是父类的原型
``` 
class Point{
    static myMethods(esg){
        console.log('static',esg)
    }
    myMthods(msg){
        console.log('instance',msg)
    }
}

class Child extends Parent {
    static myMethod(msg){
        super.myMthod(msg)
    }
    myMethod(msg){
        super.myMythod(msg)
    }
}
Child.myMethod(1)//static 1
const child = new Child()
child.myMthod(2)//instance 2
```

在上面代码中在普通方法中super指向父类的原型,在静态方法中指向父类

### 最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。
```
var obj = {
  toString() {
    return "MyObject: " + super.toString();
  }
};

obj.toString(); // MyObject: [object Object]
```

## Mixin 模式的实现

Mixin 指的是多个对象合成一个新的对象,新对象具有各个组成成员的接口.它的最简单实现如下
```
const a ={
    a:'a'
}
const b ={
    b:'b'
}
const c ={...a,...b}
```

下面是一个更加完备的实现

function mix(...mixins){
    class Mix{}
    for(let mixin of minxins){
        copyProperties(Mix.prototype,mixin)
        copyProperties(Mix.prototype,Reflect.getPrototypeOf(minxin))
    }
    return Mix
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor"
      && key !== "prototype"
      && key !== "name"
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

上面代码的mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。
```
class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}
```