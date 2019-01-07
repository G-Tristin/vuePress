# redux

[参考文档](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

redux的流程分析

一个完整的redux的实例
```
import createStore form 'redux';
const state = {number:1}
const reducer = function(state,action){ //reducer函数可以理解为状态修改器
必须通过dispath来触发状态的修改 而状态具体要修改什么，则由action来决定 第一个参数为初始状态
  switch (action.type){
    case 'add':
      const number = state.number++
      return Object.assign({},state,{number})  //要引起状态改变必须返回一个完整的新的state对象 注意对象存在引用的问题
    default
      return
  }
}
const store = createStore(reducer);
action //是一个对象，当中必须要存在的一个属性是type用来代表这个action，相当于是这个action的名字
由于action可能会有多个，所以常见的用法是用一个函数构造action 方法如下
function createAction(type,text){
  return {
    type,
    text,
  }
}
const action = createAction('add','hello') // 创建了一个action
store.dispatch({ //触发reducer函数 告诉它需要状态修改 并且把要修改的内容当成参数传入
  type: 'ADD_TODO',
  payload: 'Learn Redux'
});
store.dispatch(createAction('add','aaa')) //是否可以通过这种方式来动态的创建action并提交修改
store.subscribe(()=>{
  let newState = store.getState();
  component.setState(newState);
})
```

redux当中有2个必须要注意的点 1.action的函数化构造 2.reducer的拆分

### 如何实现reducer的拆分

方法一：手动拆分

拆分前
```
const chatReducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CHAT:
      return Object.assign({}, state, {
        chatLog: state.chatLog.concat(payload)
      });
    case CHANGE_STATUS:
      return Object.assign({}, state, {
        statusMessage: payload
      });
    case CHANGE_USERNAME:
      return Object.assign({}, state, {
        userName: payload
      });
    default: return state;
  }
};
```

拆分后

```
function chatLog(state,action){
  ...
}
function statusMessage(state,action){
  ...
}
function userName(state,action){
  ...
}
const chatReducer = (state = defaultState, action = {}) => {
  return {
    chatLog: chatLog(state.chatLog, action),
    statusMessage: statusMessage(state.statusMessage, action),
    userName: userName(state.userName, action)
  }
};
```

方法2 ：使用内置方法

Redux 提供了一个combineReducers方法，用于 Reducer 的拆分,你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。

```
import { combineReducers } from 'redux';

const chatReducer = combineReducers({
  chatLog,
  statusMessage,
  userName
})

export default todoApp;
```

这种写法有一个前提，就是 State 的属性名必须与子 Reducer 同名。如果不同名，就要采用下面的写法。

```
const reducer = combineReducers({
  a: doSomethingWithA,
  b: processB,
  c: c
})

// 等同于
function reducer(state = {}, action) {
  return {
    a: doSomethingWithA(state.a, action),
    b: processB(state.b, action),
    c: c(state.c, action)
  }
}
```

## store的实现

- store.getState() ---获取当前状态
- store.dispatch() ---触发action
- store.subscribe() ---设置监听器,store一旦变化 就会调用监听器里的回调函数，一般写入setState()的函数或者render()函数

## redux 中间件

redux当中的中间件的作用就是给store.dispatch()添加功能

中间件的使用：
```
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
const logger = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(logger)
);
```

虽然看起来中间件不是直接作用在sotre.dispatch上但是在源码当中，它作用的地方就是store.dispatch()

中间件的主要作用是为了处理异步操作：

异步操作的基本思路：

异步需要3个action,请求前发送一个action 请求成功后一个action 请求失败后触发一个action 一共3个，同步只需要一个。

- 使用redux-thunk中间件
- 使用redux-promise中间件

还是看[文档](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)