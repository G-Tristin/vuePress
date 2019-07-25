# declare namespace

namespace 是ts早期时为了解决模块化而创造的关键字又称为命名空间，namespace被淘汰了，但是在申明文件中，declare namespace还是比较常用的，它
用来表示全局变量是一个对象，包含很多子属性。

如果对象拥有深层的层级，则需要用嵌套的namespacel来声明深层的属性的类型
```
// src/jQuery.d.ts
declare namespace jQuery{
    function ajax(url:string,setting?:any):void;
    namespace fn{
        function extend(objcet:any):viod;
    };
}

jQuery.ajax('/api/ger_something');
jQuery.fn.extend({
    chenck:function(){
        return this.each(function(){
            this.check = true
        })
    }
})
```

假如jQuery下仅有fn这一个属性(没有ajax等其它属性和方法)，则可以不需要嵌套namespace
```
declare namespace jQuery.fn{
    function extend(object.any):void
}

jQuery.fn.extend({
    check:function(){
        return this.each(function(){
            this.checked = true
        })
    }
})
```

除了全局变量之外，可能有一些类型我们也希望能够暴露出来。在类型声明文件当中，我们可以直接使用interface或者type来申明一个全局的接口或者类型。
```
interface AjaxSettigs{
    methods?:'GET'|'POST'
    data?:any
}
以上是申明了一个全局的类型

declare namesapce jQuery{
    function ajax(url:sting,settings?AjaxSettigs):void
}
以上是申明了一个全局变量
```
