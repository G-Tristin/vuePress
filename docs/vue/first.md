# 从Vue基础开始

- 首先我们需要引入一个Vue的包

```
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

- 在js文档当中创建一个Vue实例,并将它挂载到DOM节点上

```
var app = new Vue({
  el:"#app",
  data:{
    message:'hello Vue!'
  }
})
```

- 在HTML当中声明挂载点

```
<div id="app">
{{message}}
</div>
```

以上我们就使用了Vue实现了一个简单的demo,但是在这个地方也有我们需要注意的地方. 第一我们在这个demo当中并没有使用模板,那么Vue会自动的将id为app的DOM节点的outHTML视为VNode来使用.

## 模板语法注意事项

Vue.js使用了基于HTML的模板语法,如果我们足够熟悉DOM,并且喜欢JavaScript原生的力量页可以不适用模板,直接写[渲染函数(render)](https://cn.vuejs.org/v2/guide/render-function.html),使用可选的JSX语法.

### 插值

数据渲染当中最常见的使用方法是使用双大括号的文本插值{{}},但是使用插值渲染的都将会是一个文本,如果想要输出一个真正的HTML,则需要使用v-html来实现

### 特性

双大括号语法不能直接使用在HTML的特性上,遇到这种情况应该使用v-bind指令

### 使用JavaScript表达式

在Vue的数据绑定当中可以使用JavaScript表达式,但是不允许使用语句或者流控制

```
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

### watch和computed

在项目中computed能够解决大部分的操作,但是当数据变化时执行异步操作或开销较大的操作时,就需要使用到watch

比如说 当我们使用一个input输入框,需要对输入的不同数据做出不同的响应,那么就要使用watch属性 详情见[官网](https://cn.vuejs.org/v2/guide/class-and-style.html)

