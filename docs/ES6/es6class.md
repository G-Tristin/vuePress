# ES6类

ES6类的基础教学可以在网上搜索阮一峰的教学上面的教程已经非常的详细了,而我自己给自己写的就是一些容易忘记的地方.

## ES5类和ES6类的区别

- 定义在原型上的方法的可枚举性

在ES5类中在原型上定义方法是可以枚举的,但是在ES6中定义的方法是不可枚举的

```
var Point = function(){
    //...
}
Point.prototype.toString=function(){
    //...
}
Object.keys(Point.prototype) //['toString']
Object.getOwnPrototypeNames(Point.prototype)//['constructor','toString']


class Point{
    constructor(x,y){
        //...
    }

    toString(){

    }
}
Object.keys(Point.prototype) //[]
Object.getOwnPrototypeNames(Point.prototype) //['constructor','toString']
```

- 不存在变量提升:必须先声明类,才能构建出实例

## Constructor 
constructor方法是类的默认方法,通过new命令生成对象实例时,会自动调用该方法.
一个类必须有constructor方法,如果没有显示定义,一个空的constructor方法会被默认添加.
```
class Point{
    
}

//等同于

class Point{
    constructor(){
        //return this // 不需要显示添加默认返回this
        //也可以被改写 return Object.create(null)
    }
}
```

## 类的实例

如果想要定义自身的属性,而不是定义在类的prototype上那么我们需要将属性定义在constructor中的this上
```
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y
    }
}
var point = new Point(2,3)

point.2 === 2
point.3 === 3
```

## 取值函数(getter)和存值函数(setter)

与ES5一样,在'类'的内部可以使用get和set关键字,对某个属性设置存值函数和取值函数,拦截该属性的存取行为
```
class MyClass{
    constructor(){
        //...
    }
    get prop(){
        console.log('getter') 
    }
    set prop(value){
        console.log('setter'+value)
    }
}

let bet = new MyClass()
bet.prop = 123 //setter123
bet.prop // getter
```

## 静态方法
类当中的静态方法可以通过在属性名前面添加'static'关键字来声明这是类的静态方法
- 在静态方法中定义的this,就是只想类而不是实例
- 父类的静态方法可以被子类继承
- 静态方法也是可以从super对象上调用的
```
class Foo{
    static classMethods(){
        return 'hello'
    }
    static bar(){
        this.baz()
    }
    static baz(){
        console.log('baz')
    }
}

class Bar extends Foo{
    static classMethods(){
        return super.classMethods() +',too' //子类定义自己的静态方法,该方法调用父类的静态方法
    }
}
Foo.classMethods() // hello
Foo.bar(); // baz
let foo = new Foo()
foo.classMethods() // foo.classMethods is not a function 
Bar.classMethods() // "hello,too"
```

## 实例属性的新写法
实例自身属性的新写法 就是直接写在类的最顶层,而不是写在constructor属性的this下面.该方式的优点是直观
```
class Foo{
    bar="hello";
    baz="world"
    constructor(){
        //...
    }
}
等同于
class Foo{
    constructor(){
        this.bar = 'hello';
        this.baz = 'world'
    }
}
```

## 静态属性

静态属性值得是Class本身的属性,而不是定义在实例对象上的属性
```
class MyClass{
    static myStaticProp = 42 //目前只是提案
}
MyClass.name = 'class' //这是目前唯一可行的给类添加静态属性的方式
```

## new.target属性
该方法在够着函数当中使用返回new命令作用于的那个构造函数,返回当前类
```
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}

var obj = new Rectangle(3, 4);  // true
```
### new.target属性的使用重点
当子类继承父类的时候,new.target将返回的是子类,通过这个特性我们可以定义一些自由父类可以或者只有子类可用的方法
```
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor() {
    super();
    // ...
  }
}

var x = new Shape();  // 报错  在父类实例化时 new.target是Shape
var y = new Rectangle();  // 正确 在子类实例化时 new.target是Rectangle
```