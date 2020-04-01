## Webview

### WebView概述   
Android WebView在Android平台上是一个特殊的View，它能用来显示网页，这个WebView类可以被用来在app中仅仅显示一张在线的网页，当然还可以用来开发浏览器。

WebView内部实现是采用渲染引擎(WebKit)来展示view的内容，提供网页前进后退、网页放大、缩小、搜索等功能。

WebView是一个基于WebKit引擎、展现Web页面的控件，Android的WebView在低版本和高版本采用了不同的WebKit版本内核。

也就是说webView的引入可以让我们在我们开发的app当中显示网页。

### WebView的基本使用

WebView的最简单的使用方式即是直接显示网页内容，有以下两个步骤：

1.在布局文件中添加WebView控件

2.在代码中让WebView控件加载显示网页。