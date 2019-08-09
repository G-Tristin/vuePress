# 路由小技巧
在Vue项目当中在不同路由使用同一个组件的情况在实际业务中使用的频率还是非常多的

但是在默认的情况下，这2个页面之间的切换时不会触发vue的create或者mounted的钩子的，官方文档说通过watch $router的变化来做处理，但是其实说的还是比较麻烦的。简便的操作是在router-view上加上唯一的一个key，来保证路由切换的时候都会重新渲染和触发钩子。这样就会比较简单。

实际原理：vue的渲染机制每次碰到组件的key值不同时都会重新渲染该组件

```
<router-view :key="key"></router-view>

computed:{
  key(){
    return this.$router.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
  }
}
```