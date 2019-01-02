# express静态资源处理

## 静态文件
除非应用是纯 API 服务，否则总可能需要发送静态文件。这些文件可能是静态图片 CSS 样式文件或者是静态 HTML 文件

### 静态文件中间件
```
app.use(express.static('静态资源路径'))
app.use('/static',express.static('静态资源路径')) //这种方式给访问静态资源的路径进行设置
```
eg:
假设我们的静态资源被放在了public文件夹当中
```
const express = require('express')
const app = express()
app.use(express.static('public'))
app.listen(3000)
```
我们可以直接访问public目录中的所有文件
```
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```
如果我们使用以下方式
```
app.use('/static','public')
```
那么我们可以使用加了url前缀的方式访问
```
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```
为什么要使用添加url前缀的方式来访问静态资源?
- 静态资源如果被分开存放在不同的目录当中我们可以使用app.use()多次引入
- 如果不同目录中存在同名的静态资源如果不设置url前缀那么会默认使用第一个目录下的资源

### 动态路由响应静态文件的情形
当有人发起 /users/:userid/profile_photo 请求时，我们都需要响应对应 userid 用户的图片.静态中间件本身时无法处理该需求，不过好在 Express 可以使用与静态中间件类似的机制来处理这种情况.
```
app.use('/users/:userid/profile_photo',function(req,res){
  res.sendFile(getProfilePhotoPath(req.params.userid))
  //假设程序中存在一个名为 getProfilePhotoPath 的函数，该函数可以根据 userid 获取图片的存储路径
})
```