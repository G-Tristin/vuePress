# 移动端适配(lib-flexible)
vue项目中使用lib-flexible解决移动端适配的问题
1.引入模块
```
yarn add lib-flexible -S
```

2.使用
在项目的入口文件处引入文件
```
import 'lib-flexible'
```

注意：

   1.检查一下html文件的head中，如果有 meta name="viewport"标签，需要将他注释掉，因为如果有这个标签的话，lib-flexible就会默认使用这个标签。而我们要使用lib-flexible自己生成的 meta name="viewport"来达到高清适配的效果。

   2.因为html的font-size是根据屏幕宽度除以10计算出来的，所以我们需要设置页面的最大宽度是10rem。

   3.如果每次从设计稿量出来的尺寸都手动去计算一下rem，就会导致我们效率比较慢，还有可能会计算错误，所以我们可以使用px2rem-loader自动将css中的px转成rem。

第二部分:使用px2rem-loader自动将css中的px转换成rem

注意:

    1.此方法只能将.vue文件style标签中的px转成rem，不能将script标签和元素style里面定义的px转成rem

    2.如果在.vue文件style中的某一行代码不希望被转成rem，只要在后面写上注释 /* no*/就可以了