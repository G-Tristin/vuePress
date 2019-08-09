# 组件化

- 组件化的Vue实例data必须是一个函数

- 在组件上使用v-model

- 解析DOM模板时的注意事项

有些HTML元素,诸如`<ul> <ol> <table>`和`<select>`,对于哪些元素可以出现在其内部是有严格限制的.诸如`<li> <tr>`和`<option>`,只能出现在其他某些特定的元素内部.

这会导致我们使用这些有约束的条件的元素时遇到一些问题.例如:

```
<table>
  <blog-post-row></blog-post-row>
</table>
```

这个自定义组件`<blog-post-row>`会被作为无效的内容提升到外部,并导致最终渲染结果出错.幸好这个特殊的is特性给了我们一个变通的办法

```
<table>
  <tr is="blog-post-row">
</table>
```

## 组件注册的方式

1.全局注册组件

组件化是Vue另一个重要的概念,因为它是一种抽象,允许我们使用小型,独立和通常可复用的组件构建大型应用.

全局组件注册的方式:

- 首先注册一个组件

```
Vue.component('todo-item',{
  template:'<li>这是一个代办项</li>', //模板
  props:[],
  data(){
    return {
      message:'' //保存父组件传递过来的参数,一般需要动态绑定
    }
  }
})
```

- 在别的组件当中使用(全局注册的组件可以在任意的组件当中使用)

```
<div id="app-7">
  <ol>
    <todo-item
      v-for="item in groceryList" //最好带上key以用来给每个被循环渲染出来的元素打上一个特定的标签,防止在删除DOM时出错
      v-bind:todo="item"
      v-bind:key="item.id">
    </todo-item>
  </ol>
</div>
```

2.局部注册组件

全局注册的组件是不够理想的.比如,如果你使用一个像webpack这样的构建系统,全局注册所有的组件意味着即便你已经不再使用一个组件了,它任然会包含在你最终的构建结果当中.这造成了用户下载的JacScript的无意义的增加.

在这些情况下,我们可以通过一个普通的JavaScript对象来定义组件

```
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }

new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
```

## 动态渲染组件

有时候我们可能需要在不同的组件之间进行动态的切换

那么我们需要使用Vue的一个`<component>`元素加一个特殊的is特性来实现

```
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
```

在上述示例中，currentTabComponent 可以包括 (指的就是一个组件)

- 已注册组件的名字
- 一个组件的选项对象

### 在动态组件上使用 keep-alive

当我们切换组件的时候,我们可能会项保存组件之前的状态,但是我们切换组件之后组件都会被重现渲染之前的状态会被清空,这是会我们只需要在组件外面包一层`<keep-alive>`

```
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```
