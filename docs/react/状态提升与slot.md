# 状态提升

使用React经常会碰到使用几个组件需要公用状态数据的情况。这种情况下我们最好将这部分共享的状态提升至他们最近的父组件当中进行管理。

## React当中的组合

组合相当于是Vue当中的slot属性

1.组合的第一种用法

```
function FancyBorder(props){
  return (
    <div class={'FancyBorder FancyBorder-'+props.color}>
       {props.Children}
    </div>
    )
}

function WelcomeDialog(){
  return(
    <FancyBorder>
      <h1 className="Dialog-title"></h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  )
}
```

使用这种方式可以在组组件当中插入React

原理：

`<FancyBorder>`组件的JSX当中的任何内容都可以通过children属性传入到FancyBorder当中。由于FancyBorder在一个`<div>`内渲染了 {props.children}，所以被传递的所有元素都会出现在最终输出中。

2.组合的第二种方法

直接将子组件当做参数传入到父组件当中使用
```

function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```