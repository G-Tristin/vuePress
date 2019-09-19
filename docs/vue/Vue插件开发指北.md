# Vue插件开发
在日常开发的项目中，为了提高代码的可复用性，提高自身的Vue的开发功底，我觉得有必要学习一下Vue的插件该如何开发。

[Vue插件开发文档](https://cn.vuejs.org/v2/guide/plugins.html)

## 使用插件
通过全局方法Vue.use()使用插件。它需要在你调用new Vue()启动之前完成它。
```
Vue.use(MyPlugin)
new Vue({
  
})
```
也可以传入一个可选的参数对象
```
Vue.use(MyPlugin,{someOption:true})
```
`Vue.use`会自动阻止多次注册相同插件，届时即使多次调用也只会注册一次该插件

## 开发插件
Vue.js的插件应该暴露一个`install`方法。这个方法的第一个参数是Vue的构造器，第二个参数是一个可选的选项对象:

- 添加全局的属性或者方法
- 添加全局的资源: 指令/过滤器/过渡
- 通过全局的mixin方法添加一些组件选项
- 添加Vue实例方法，通过把它们添加到Vue.prototype上实现
- 一个库，提供自己的API，同时提供上面提到过的一个或多个功能，如Vue-router
```
MyPlugin.install = function(Vue, options){
  // 1.添加全局的属性和方法
  Vue.myGlobalMethod = function(){}
  // 2.添加全局资源 此处是全局指令
  Vue.directive('my-directive', {
    bind(el, bingding, vnode, oldVnode){}
  })
  // 3.注入组件选项
  Vue.mixin({
    created:function(){}
  })
  // 4.添加实例方法
  Vue.propotype.$mymethods = function(methodOptions){}
  // 5.注册组件
  Vue.component(组件名，组件)
}
