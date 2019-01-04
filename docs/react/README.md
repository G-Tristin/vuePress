# REACT
react的详细内容可以在[官方文档](https://react.docschina.org)当中查看，此处我之关注的是我再react当中看到的需要注意的地方。

## JSX
```
const element = <h1>Hello,world!<h1>;
```
这种看起来有些奇怪的标签语法既不是字符串也不是HTML。他被称为JSX，是一种javaScript的语法扩展。我们推荐在React中使用JSX来描述用户界面。
JSX看起来可能比较像是模板语言，但事实上它完全是在JavaScript内部实现的。 

关于JSX的个人理解:

我这里所说的对JXS的理解并不是说，JSX的实现原理是什么？而是我们在实际开发过程中如何避免写出错误的JSX语法。在JSX中当我们想要嵌入js语句需要使用
{}将其包裹起来，并且该语句可以理解为会立即执行。并且执行的结果(返回值)必将是：类似HTML结构的语句或者文本字段。

- 我们任意的在JXS中使用JavaSript表达式，在JSX当中的表达式要包含在大括号里面

重点:

JSX本身也是一种表达式

在编译之后，JSX其实会被转化为普通JavaScript对象(它不是一中HTML结构)，这意味着，我们可以在if或者for语句当中使用JSX，将它赋值给变量，当做参数传入，作为返回值都可以。 因为它是一个对象！！！

## state&生命周期
生命周期指的是React组件从创建到卸载的整个过程。state则负责管理React的一些状态信息。

- 当我们直接更新state当中的属性值的时候是不会触发视图更新的
我们需要通过this.setState({comment:'hello'})来动态的跟新属性才能触发视图的跟新变化

note:

- React可以将多个setState()调用合并成一个调用来提高性能
- React当中的状态如果有异步的状态更新的话，通过setState()传入一个对象可能会无法触发视图的跟新，这个时候需要使用函数来保证异步函数执行之后触发视图的更新 
```
this.setState((prevState,props)=>({
  counter:prevState.counter + props.increment
  //比如此处的props.increment的状态是异步改变的 那么久必须使用这种函数的形式来触发视图更新
}))
```

React当中也使用了一个单项数据流的概念

## React事件

- 在React当中 所有的事件都需要给它绑定this对象对该组件本身上面，如果不绑定函数当中的this会默认指向执行环境

```
constructor(props){
  super(props);
  this.state = {isToggle:true}
  this.handleClick = this.handleClick.bind(this) //在constuctor当中this默认指向该类的实例 或者在改函数被调用的时候绑定this对象
}
```

- 在React对象当中事件对象要放在参数的最后面 这与之前事件对象的参数位子不同

``` 
Class Popper extend React.Component{
  constructor(props){
    super(props);
    this.state = {
      name:"hello world"
    }
  }
  preventPop(name,e){
    e.preventDefault
    alert(name)
  }
  render(){
    return (
      <div onClick={this.preventPop.bind(this,this.state.name)}>Click<div>
    )
  }
}
```

## 条件渲染

React的条件渲染和Jacascript中的一致，使用javascript的运算符if或者条件运算符来创建表示当前状态的元素，然后让React根据条件状态来更新UI

- 元素变量

可以使用变量来存储元素
```
render(){
  const isTrue = this.state.isTrue;
  let button = '';
  if(isTrue){
    button = <children onClick={this.Click.bind(this)}></children>
  }else{
    button = <children onClick={this.Click.bind(this)}></children>
  }
  return {
    <div>
    {button}
    </div>
  }
}
```

- 与运算符
可以通过使用{}包裹代码的形式在JSX中可以嵌入任何的表达式，也包括JavaScript当中的逻辑符与 && 它可以方便的渲染一个元素

```
render(){
  return{
    <div>
      <h1></h1>
      {
        this.state.unreadMessages.length>0 && <h2>You have {unreadMessages.length} unread messages.</h2>
      }
    </div>
  }
}
```

为什么可以这么实现？

因为在JavaScript当中，使用与运算符 && 。 若果是 true && code。那么返回的总是code。所以可以用它来做条件判断

- 三目运算符 实现方式和原理和以上的都差不多没有必要再赘述。

## 阻止组件渲染

在很多情况下我们要分条件的渲染一些组件除了以上的一些方式之外，我们还可以是用阻止组件渲染的方式来分条件的渲染组件。

实现方式就是让render函数返回null,因为render函数返回的所有JSX代码最后的编译结果都是object。

```
render(){
  if(this.props.visible){
    return {
      <div> this is visible</div>
    }else{
      return null
    }
  }
}
```