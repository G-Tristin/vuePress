# css
这里是一块记录我遇到的一些CSS的问题的解决方式，以及一些SASS的学习记录。

## 父选择器 &
`&`表示嵌套在外层的父选择器

`&`必须作为选择器的第一个字符，其后可以跟随后缀生成复合的选择器
```
#main{
  width:200px;
  &-sidbar{
    width:200px;
  }
}
```

## 属性嵌套
有些css属性遵循相同的命名空间(name-space),比如`font-family`,`font-size`,`font-weight`都是以`font`作为属性的命名空间，为了方便这样的管理属性，同时避免重复输入，Sass允许将属性嵌套在命名空间中，例如：
```
.div{
  font{
    size:30px;
    family:'微软雅黑';
    weight:blod;
  }
}
```

## SassScript
在css属性的基础上`Sass`提供了一些名为SassScritp的新功能。SassScript可作用于任何属性，允许属性使用变量、算数运算等额外功能。通过 interpolation，SassScript 甚至可以生成选择器或属性名，这一点对编写 mixin 有很大帮助。

### 变量$
变量以`$`符号开头，赋值的方法和css属性的写法一致

变量支持块级作用域，嵌套规则内定义的变量只能在嵌套规则内使用(局部变量)，不在嵌套规则内的变量则可以在任何地方使用(全局变量)。将局部变量转换为全局变量则可以在任何地方使用
```
#main{
  $width:10px !global; // $width被转变为全局变量
}
```

### 数据类型
- 字符串
SassScript支持css的两种字符串类型:有引号字符串和无引号字符串。在编译时sass不会改变其字符串的类型只有一种情况除外，使用#{}时，有引号字符串将被转化成无引号字符串。这样便于在minix中引用选择器名
```
@mixin firefox-message($selector) {
  body.firefox #{$selector}:before {
    content: "Hi, Firefox users!";
  }
}
@include firefox-message(".header");

// 编译后
body.firefox .header:before {
  content: "Hi, Firefox users!";
}
```

### 运算
所有的数据类型都支持相等运算`==`或`!=`,此外，每种数据类型也有他们自己支持的运算方式

#### 数字运算
sassScript支持数字的加减乘除、取整等运算( + - * /),如果必要会在不同的单位间转换
```
p {
  width: 1in + 8pt;
}
```

- `/`的意义比较特殊

`/`在css当中通常起到分隔数字的作用，sassScript也保留了这个功能但同时为了让其支持除法运算也做了部分的限制，下面时让sassScript认为时除法运算的条件
- 如果值或者值的一部分是**变量**或者是**运算返回的结果**
- 如果值被圆括号包裹
- 如果值是算数表达式的一部分
```
p {
  font: 10px/8px;             // Plain CSS, no division
  $width: 1000px;
  width: $width/2;            // Uses a variable, does division
  width: round(1.5)/2;        // Uses a function, does division
  height: (500px/2);          // Uses parentheses, does division
  margin-left: 5px + 8px/2px; // Uses +, does division
}
编译为
p {
  font: 10px/8px;
  width: 500px;
  height: 250px;
  margin-left: 9px; 
}
```

如果需要使用变量，同时又要确保 / 不做除法运算而是完整地编译到 CSS 文件中，只需要用 #{} 插值语句将变量包裹

```
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}

编译为
p {
  font: 12px/30px;
}
```

### 插值语句 #{}
通过插值语句可以在选择器或者属性名当中使用变量
```
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
  $name:box;
  .#{$name}{
    width:200px;
  }
}

编译后
p{
  font:12px/30px;
  .box{
    width:200px;
  }
}
```

## @-Rules与指令
Sass支持所有的CSS `@-Rules`,以及Sass特有的"指令"

### @import
Sass拓展了`@import`的功能，允许其导入Scss或Sass文件。被导入的文件将合并编译到同一个CSS文件中，另外，被导入的文件中所包含的变量或者混合指令(mixin)都可以在导入的文件当中使用。

通常,`@import`寻找Sass文件并将其导入，但在以下情况下，`@import`仅作为普通的CSS语句，不会导入任何sass文件。
- 文件拓展名是`.css`
- 文件名是以`http://`开头的
- 文件名是`url()`
- `@import`包含`media queries`
默认情况下如果导入的文件没有拓展名，那么sass或默认给他加上拓展名`sass`或者`scss`。
```
@import 'foo'
@import 'foo.scss'
// 以下的导入方式将不会被编译为sass
@import 'foo.css'
@import 'http://foo.com/bar'
@import url('foo')
@import 'f00' screen //包含media queries
```

### @import嵌套


## SASS混合
混合器在某些方面和类很相似。都让我们给一大段样式命名，所以当我们选择使用哪一个是会让我们产生困惑。其实最重要的区别就是类名是在html文件中的引用，而混合器
则是在样式表中应用。这就意味者类名具有语义化的含义，而不仅仅是一种展示性的描述：用来描述html元素的含义而不是html的外观。而另一方面，混合器是展示性的描述，用来描述一条CSS应用之后会产生什么样的效果。

一般 类名 都需要具有语义化含义，而不仅仅是一种展示性的描述：用来描述html元素的含义而不是html元素的外观。---这就是类名的命名方式

一般 混合器 是展示性的 它描述了包含它的CSS规则最终的视觉样式：用来描述展示样式的名臣。 ---这是混合器的命名方式

### 混合器中的CSS规则
混合器中不仅可以包含属性，还可以包含css规则，即包含选择器和选择器中的属性：
```
@mixin no-bullets{
  list-style:none;
  li{
    list-style-image:none;
    list-style-type:none;
    margin-left:0px;
  }
}

.plain{
  color:red;
  @include no-bullets;
}

编译结果
.plain{
  color:red;
  list-style:none;
}
.plain li{
  list-style-image:none;
  list-style-type:none;
  margin-left:0px;
}
```

### 给混合器传参
混合器并不一定要生成同样的样式。可以通过在@include混合器是给混合器传参，来定制混合器生成的精准样式。当@include混合器时，参数其实就是可以赋值给CSS的变量。
```
定义:
@mixin link-color($normal,$hover,$visited){
  color:$normal;
  &:hover{
    color:$hover;
  }
  &:visited{
    color:$visited;
  }
}

引入:
a{
  @include link-color(blue,red,black);
}

编译结果:
a{
  color:blue;
}
a:hover{
  color:red;
}
a:visited{
  color:black;
}
由于传递参数的时候很难区分每个参数时什么意思，参数之间是一个什么样的顺序。为了解决这个问题sass允许通过语法$name:value的形式指定每一个参数的值。
这种传参的形式，参数顺序就不需要在乎了，只需要保证没有漏掉的参数就行了。
a{
  @include link-color($normal:blue,$hover:red,$visited:black);
}
```

### 混合器的参数默认值
为了在@include混合器时不必传入所有的参数，我们可以给参数指定一个默认值。参数默认值使用$name:default-value的声明形式。
默认值可以是任何有效的css属性，甚至是其他参数的引用，代码如下：
```
@mixin link-colors($nomal,$hover:$noaml,$visited:$normal){
  color:$normal;
  &:hover{
    color:$hover;
  }
  &:visited{
    color:$visited;
  }
}
```
如果像下面这样调用 
```
a{
  @include link-colors(red);
}
```
那么$hover以及$visited也都会被赋值成为red

## 使用选择器继承来精简SASS
使用SASS的时候，最后一个减少重复的主要特性就是选择器继承。基于Nicole Sullivan面向对象的css的理念，选择器继承就是一个选择器可以继承另一个选择器的所有样式。这个通过`@extend`语法来实现。
```
.error{
  border:1px solid red;
  background-color:#fdd;
}
.seriousError{
  @extend .error;
  border-width:3px;
}
```
在上面的代码中,`.seriousError`将会继承样式表中任何位置处类名为`.error`定义的所有样式。以`class="seriousError"`修饰的html元素最终展示效果就好像是`class="seriousError error"`。相关元素不仅会拥有一个3px宽的边框，而且这个边框将会变成红色的并且有一个浅红色的背景。这些都是在`.error`当中定义的。`.seriousError`不仅会继承`.error`自身的所有样式，任何`.error`有关的组合选择器样式也会被`.seriousError`以组合选择器的形式继承。
```
.error a{
  color:red;
  font-weight:100;
}
```
上面这段代码也会被继承 并且应用到`.seriousError a`的html元素上但不是应用到`.seriousError`的html元素上

## 控制指令
SassScript提供了一些基础的控制指令，比如满足一定条件时引用样式，或者设定范围重复输出格式。控制指令是一种高级功能，日常编写过程中并不会常用到，主要和混合指令结合使用(@mixin)。

### @if
当`@if`的表达式返回值不是`false`或者`null`时，条件输出成立，输出`{}`内的代码
```
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```
### @for
@for指令可以在限制的范围内重复输出格式，每次按要求(变量的值)对输出结果做出变动。这个指令包含两种格式:

- `@for $var from <start> through <end>`
- `@for $var from <start> to <end>`

区别在于`through`和`to`的含义。当使用through时条件范围包含`<start>`与`<end>`的值，而使用to时条件范围只包含`<start>`的值而不包含`<to>`的值。另外,`$var`可以时任意变量，比如`$i`;`<start>`和`<end>`必须是整数。
```
@for $i from 1 through 3 {
  .item-#{$i}{
    width:2rem * $i
  }
}

编译后
.item-1 {
  width: 2rem; 
}
.item-2 {
  width: 4rem; 
}
.item-3 {
  width: 6rem; 
}
```

### @each
`@each`指令的格式是`$var in <list>`,$var 可以是任意变量名，比如$length或者$name,而<list>是一连串的值，也就值列表。
@each将变量$var作用于值列表中的每一个项目，然后输出结果，如
```
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon{
    background-image:url('/iamges/#{animal}.png')
}
编译为
.puma-icon {
  background-image: url('/images/puma.png'); 
}
.sea-slug-icon {
  background-image: url('/images/sea-slug.png'); 
}
.egret-icon {
  background-image: url('/images/egret.png'); 
}
.salamander-icon {
  background-image: url('/images/salamander.png'); 
}
```

### @each进阶(声明多个变量)
- 数组形式
```
@each $animal, $color, $width in (moncky, mouse, cat), (red, blue, pink), (20px, 30px, 40px){
  .#{$animal}-icon{
    background-image:url('/imags/#{animal}.png');
    color:$color;
    width:$width;
  }
}
编译后
.puma-icon {
  background-image: url('/images/moncky.png');
  color:red;
  width: 20px; 
}
.sea-slug-icon {
  background-image: url('/images/mouse.png');
  color:blue;
  cursor: 30px; 
}
.egret-icon {
  background-image: url('/images/cat.png');
  color:pink;
  cursor: 40px; 
}
```
- map形式
```
@each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
  #{$header} {
    font-size: $size;
  }
}
编译后
h1 {
  font-size: 2em; 
}
h2 {
  font-size: 1.5em; 
}
h3 {
  font-size: 1.2em; 
}
```

### @while
@while指令重复输出格式直到表达式返回结果为false。这样可以实现比@for更复杂的循环，只是很少被用到。例如：
```
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2; // 修改变量的值
}

编译后
.item-6 {
  width: 12em; 
}

.item-4 {
  width: 8em; 
}

.item-2 {
  width: 4em; 
}
```

### 何时使用继承
混合器主要用于展示性样式的重用，而类名主要用于语义化样式的重用。因为继承是基于类的(有时是基于其他类型的选择器)，所以继承应该是建立在语义化的关系上的。当一个元素拥有类(.seriousError)表明它属于另一个类(.error)这时候就可以使用继承。

### 继承的工作细节

跟变量和混合不同，继承不仅仅用css样式替换某一处的代码那么简单。为了不让你对继承产生疑惑，对这背后的工作原理有一定的了解是非常重要的。

@extend背后最基本的想法是，如果`.seriousError @extend .error `,那么样式表中的任何一处的`.seriousError`都可以用`.error .seriousError`这一组选择器进行替换.

### 继承的最佳实践
通常使用继承会让你的css美观、整洁。因为继承只会在生成css时复制选择器，而不会复制大段的css属性。但是如果你不小心，可能会让生成的css中包含大量的选择器复制。避免这种情况出现的最好方法就是**不要在css规则中使用后代选择器**（比如.foo .bar）去继承css规则。如果你这么做，同时被继承的css规则有通过后代选择器修饰的样式，生成css中的选择器的数量很快就会失控：值得一提的是，只要你想，你完全可以放心地继承有后代选择器修饰规则的选择器，不管后代选择器多长，但有一个前提就是，不要用后代选择器去继承。

### 延申复杂的选择器
Class选择器并不是可以被唯一延申的选择器，Sass可以延申**任何定义给单个元素**的选择器，比如`.specil.cool`,`a:hover`或者`a.user[href^="http://"]`等。
```
.hoverlink{
  @extend a:hover;
}
a:hover{
  text-decoration: underline;
}

编译为
a:hover,.hoverlink{
  text-decoration:underline;
}
```

