# vue

其实Vue的官方文档的介绍已经是详细的不能再详细了,我之所以要写一点东西,一是为了给自己留一些提示,二是为了加深自己的印象.

要了解Vue先了解Object.definePrototype

[vue技术揭秘](https://ustbhuangyi.github.io/vue-analysis/)

## Object.definePrototype

1.属性描述符

属性描述符分为2种：这2种描述符不会同时属于一个属性

1.数据描述符：是一个具有值的属性，该值可能是可写的，也可能不是可写的

2.存取描述符：是由getter-setter函数对描述的属性。描述符必须是这两种形式之一

相同点：无论一个对象的属性属于哪种描述符，他都具有以下属性：

1.configurable：当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。

2.enumerable：当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。默认为 false。

不同点：

数据描述符具有以下可选的属性：

1.value: 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。

2.writable: 当且仅当该属性的writable为true时，value才能被赋值运算符改变。 默认为 false。

存取描述符同时具有以下可选的键值属性

1.get:一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入this对象（由于继承关系，这里的this并不一定是定义该属性的对象）。

2.set:一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。

note:

1.这些选项不一定是自身属性，如果是继承来的也要考虑。为了确认保留这些默认值，你可能要在这之前冻结 Object.prototype，明确指定所有的选项，或者通过 Object.create(null)将__proto__属性指向null。

2.如果一个描述符不具有value,writable,get 和 set 任意一个关键字，那么它将被认为是一个数据描述符。如果一个描述符同时有(value或writable)和(get或set)关键字，将会产生一个异常。
