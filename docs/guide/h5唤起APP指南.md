# h5唤起APP指南

h5唤起APP的作用是在于给APP引流，通过在浏览器发放h5页面，并且可以让用户点击h5从而将用户引流到APP。引流有两种形式，同时也是我们对唤端的定义：引导已下载用户打开APP，引导未下载用户下载APP。

引导已下载用户打开APP，从数据上说用户停留在APP的时间更多了，是在提高用户的黏性；从体验上说APP体验是要比H5好的。引导为下载用户下载APP，可以增加我们的用户访问量。

上面解释了what以及Why根据3w法则我们还需要了解到how，那就是如何唤端?

## 唤端媒介 - URL Scheme

## 来源

手机当中会存储许多私密信息、联系方式、银行卡信息。我们不想这些信息可以被手机应用随意获取到，防止信息泄露。所以如何保证个人信息在设备所有者不知情的情况下被使用，是智能设备的核心安全问题。因此苹果手机设置了名为**沙盒**的机制：应用只能访问它声明可能访问的资源。但沙盒也阻碍了应用间合理的信息共享，某种程度上限制了应用的能力。而URL Scheme的功能就是帮我们实现合理德信息共享。

### URL Scheme是什么?

URL的组成
```
[scheme:][//authority][path][?query][#hash]
```
例如`https://www.baidu.com`当中`https`就是scheme。

这就像我们给服务器资源分配一个URL，以便我们能够访问它。我们同样可以给手机APP分配一个特殊格式的URL，用来访问这个APP或者这个APP当中的某个功能。APP需要一个标识，好让我们可以定位到它，它就是URL的scheme部分。

### 常见的SCheme

- weixin:// 微信
- apipay:// 支付宝
- taobao:// 淘宝
- sinaweibo:// 微博
- mqq:// QQ
- zhihu:// 知乎
- sms:// 短信

### URL shceme语法
上面表格中都是简单的用于打开APP的URL Scheme,下面才是我们常用的URL Scheme格式:
```
scheme://[path][?query]
```
- scheme :应用标识
- path :路径 链接到应用的某个功能
- query :参数 功能需要的参数

## intent

安卓的原生谷歌浏览器自从`chrome25`版本开始对于唤端功能做了一些变化，`URL Scheme `无法再启动Android应用。例如通过`iframe`指向`weixin://`，即使用户安装了微信也无法打开。所以**APP**需要实现谷歌官方提供的 `intent: `语法。

### intent语法
```
intent:
   path 
   #Intent; 
      package=[string]; 
      action=[string]; 
      category=[string]; 
      component=[string]; 
      scheme=[string]; 
   end;
```
- path 路径信息
- scheme 应用协议名称,如微博的是`weibo`
- package 应用包名,如微博是`com.sina.weibo`
- action 传递给应用参数，表示该次跳转动作的名称
- actegory 传递给应用参数，表示约束
- component 传递给应用参数，表示目标类型

跳转APP失败的处理方式

- 如果用户为安装APP，则会跳转到系统默认商店。
- 如果我们想指定一个唤起失败的跳转地址，则添加以下字符串到end前面即可。
```
S.browser_fallback_url=[url]
```

示例：

下面是打开Zxing二维码扫描APP的intent(即APP设置好的intent)
```
intent:
  //scan/
  #Intent;
  package=com.google.zxing.client.android;
  scheme=zxing; 
end;
```

所以我们在浏览器设置当中对应的打开该APP的URI链接为
```
<a href="intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;S.browser_fallback_url=http%3A%2F%2Fzxing.org;end"> Take a QR code </a>
```

## Universal Link
`Universal Link `是苹果在WWDC2015上为iOS9引入的新功能，通过传统的HTTP链接即可打开APP。如果用户未安装APP，则会跳转到该链接所对应的页面。

该形式为 ios 特有。

具体可以查看 UniversalLinks

需要 ios 开发者做一些特殊的配置，H5 方仅仅需要关注 ios 开发者给到的链接即可。该链接与正常链接一样，但一定是 https 开头。

###为什么要使用 Universal Link
传统的 Scheme 链接有以下几个痛点：

在 ios 上会有确认弹窗提示用户是否打开，对于用户来说唤端，多出了一步操作。若用户未安装 APP ，也会有一个提示窗，告知我们 “打不开该网页，因为网址无效”

传统 Scheme 跳转无法得知唤端是否成功，Universal Link 唤端失败可以直接打开此链接对应的页面

Scheme 在微信、微博、QQ浏览器、手百中都已经被禁止使用，使用 Universal Link 可以避开它们的屏蔽（ 截止到 18年8月21日，微信和QQ浏览器已经禁止了 Universal Link，其他主流APP未发现有禁止 ）

## 唤端媒介

通过前面的介绍我们可以发现无论是 `URL Scheme` 还是 `Intent` 或者 `Universal Link` ，他们都算是URL 。只是 `URL Scheme` 和 `Intent` 算是特殊的URL，所以我们可以拿使用URL的方法来使用它们。

具体的形式如下:
1. <a href="URL"> 直接作为 a 标签的 href，点击该标签即可跳转

2. 通过监听点击事件，将 window.location.href = URL 即可实现跳转

3. 通过监听点击事件，生成 iframe 并将 iframe.src = URL 即可实现跳转

但是不同的浏览器对这 3 中形式的唤起，以及链接的形式的支持各部相同，需要的注意点如下:
- `URL Scheme`在`ios 9+`上的浏览器中，只能通过`window.location`才能成功唤起APP
- `URL Scheme`在`andriod chrome 25+`版本必须手动触发，也就是通过`a`标签的点击触发或者通过点击按钮后再使用`iframe`或者`windwow.location.href`
- `Intent`需要`andriod chrome 25+`并需要`app`支持
- `Universal Link` 需要 `ios 9+` 并需要 `app `支持
- 微信、手Q、微博等内置的浏览器的环境下，以上 3 种形式都会有所限制，具体情况可以测试，不过基本上可以认为是失效的。

### 腾讯系APP
既然不能通过链接的形式打开 app 只能通过一些别的手段打开了。
- `ios` 端，直接打开对应的` appstore` 地址，打开后就能通过 `appstore` 打开对应的 `app`
- `andriod` 端，打开对应的应用宝，同样的通过应用宝可以打开对应 `app`
- 打开默认浏览器
但是，最上面两种处理方式只能打开 `app` 并不能打开 `app` 对应的页面，所以最好的处理方式仍是打开系统自带的默认浏览器，在通过浏览器打开 `app`。

## 判断唤端是否成功

`Android Intent` 以及 `Universal Link`它们俩的自身机制允许它们唤端失败后直接导航至相应的页面，但是 `URL Scheme` 并不具备这样的能力，所以我们只能通过一些很 hack 的方式来实现 APP 唤起检测功能。

当我们正常唤起APP后，浏览器会被隐藏到手机后台，所以可以使用这个特性来判断是否唤端成功
```
const initialTime = new Date();
let counter = 0;
let waitTime = 0;
const checkOpen = setInterval(() => {
   count++;
   waitTime = new Date() - initialTime;
   if (waitTime > 2500) {
      clearInterval(checkOpen);
      cb();
   }
   if (counter < 100) return;
   const hide = document.hidden || document.webkitHidden;
   if (!hide) {
      cb(); // 唤端失败的回调函数
   }
}, 20);
```