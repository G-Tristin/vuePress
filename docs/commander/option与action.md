# option与action的理解
option是给命令添加选项,并且可以配置一些选项的信息,以及处理选项的一些回调函数.的而action一般是给命令添加参数或者添加子命令而出发的函数.

## 区别
option当中的回调函数的this指向是node对象,而action的this指向是当前的command实例(如果是子命令下的action那么this就指向当前的子命令的command对象)

## 触发机制
option当中的回调函数的触发时机在使用了这个选项的时候就会触发,而action的触发机制则是在设置了参数`commander.arguments`以及在命令行使用来参数的时候就会触发,或者使用`commander.command()`设置子命令之后,调用了该子命令就会触发action.并且arguments当中的参数 以及command当中的参数都会被设置到action的参数当中.又有action当中的this指向指向的是当前的command对象,我们可以通过this.[option]来判断时候是存在该指令,如果存在那么可以采取相应的操作...

猜想: 是否可以理解为子命令其实就是在该父命令上添加了一个参数而已.应该是触发的原理相同但是实现的原理不同.

## command对象
commande对象下的常见属性有一下几个
- commands ---该command命令下的子命令 是一个数组对象
- options  ---该命令的选项 是一个数组 里面包含了该命令所拥有的所有选项对象
- _args    ---该命令的参数信息 是一个数组  里面包含了该命令的所有参数以及参数的描述信息
- _name    ---该命令的名称
- parent   ---该命令的父级命令对象
- _description ---描述信息
- _events  ---一个包含该命令的option以及action的所有回调函数事件
- _eventsCount  --- 事件的个数总和
- 还有最后一个关键的属性:[option] ,这是一个不一定存在的属性 属性值为boolean.决定他的存在因数是option,如果存在`command.option('-l, --list')`那么就会存在一个属性值为true的list属性
