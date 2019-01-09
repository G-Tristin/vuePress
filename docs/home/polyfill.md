# polyfill

- polyfill是什么?

polyfill:Polyfill你可以理解为“腻子”，就是装修的时候，可以把缺损的地方填充抹平。

举个例子，html5的storage(session,local), 不同浏览器，不同版本，有些支持，有些不支持。

有些人就写对应的Polyfill（Polyfill有很多），帮你把这些差异化抹平，不支持的变得支持了（简单来讲，写些代码判断当前浏览器有没有这个功能，没有的话，就写一些支持的补丁代码）。

- shim和polyfill有什么区别?
在JavaScript的世界里,有两个词经常被提到,shim和polyfill.它们指的都是什么,又有什么区别?一个shim是一个库,它将一个新的API引入到一个旧的环境中,而且仅靠旧环境中已有的手段实现.一个polyfill就是一个用在浏览器API上的shim.我们通常的做法是先检查当前浏览器是否支持某个API,如果不支持的话就加载对应的polyfill.然后新旧浏览器就都可以使用这个API了.