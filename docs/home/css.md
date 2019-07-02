# css
这里是一块记录我遇到的一些CSS的问题的解决方式，以及一些SASS的学习记录。

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
使用SASS的时候，最后一个减少重复的主要特性就是选择器继承。基于Nicole Sullivan面向对象的css的理念，选择器继承就是一个选择器可以继承另一个选择器的所有
样式。这个通过@extend语法来实现。
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
在上面的代码中,.seriousError将会继承样式表中任何位置处类名为.error定义的所有样式。以class="seriousError"修饰的html元素最终展示效果就好像是
class="seriousError error"。相关元素不仅会拥有一个3px宽的边框，而且这个边框将会变成红色的并且有一个浅红色的背景。这些都是在.error当中定义的。
.seriousError不仅会继承.error自身的所有样式，任何跟.error有关的组合选择器样式也会被.seriousError以组合选择器的形式继承。
```
.error a{
  color:red;
  font-weight:100;
}
```
上面这段代码也会被继承 并且应用到.seriousError a的html元素上 单不是应用到.seriousError的html元素上

### 何时使用继承
混合器主要用于展示性样式的重用，而类名主要用于语义化样式的重用。因为继承是基于类的(有时是基于其他类型的选择器)，所以继承应该是建立在语义化的关系上的。
当一个元素拥有类(.seriousError)表明它属于另一个类(.error)这时候就可以使用继承。

### 继承的高级用法
任何CSS规则都可以继承其他规则，几乎任何css规则也都可以被继承。大多数情况下你可能只想对类实现继承，但是有些场合你可能想做的更多。最常用的一个高级用法是
继承一个html元素的样式。尽管默认的浏览器样式不会被继承，因为他们不属于样式表中的样式，但是你对html元素添加的所有样式都会被继承。

如果一条样式规则继承了一个复杂的选择器，那么它只会继承这个复杂选择器命中的元素所应用的样式

如果一个选择器序列继承另一个选择器，那么只有完全匹配这个选择器的元素才会继承另一个选择器的样式

### 继承的工作细节

跟变量和混合不同，继承不仅仅用css样式替换某一处的代码那么简单。为了不让你对继承产生疑惑，对这背后的工作原理有一定的了解是非常重要的。

@extend背后最基本的想法是，如果`.seriousError @extend .error `,那么样式表中的任何一处的.seriousError都用`.error .seriousError`这一组选择器进行替换.