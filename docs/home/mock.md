# 本章介绍如何mock数据

1. 需要的三放插件`mockjs`,`mocker-api`

2. 原理
- 使用`mockjs`第三方库产生模拟的数据
- 正常使用`axios`或者`fetch`请求数据
- 使用webpak拦截请求 
```
devServer: {
    port: 8080,
    open: true,
    before(app) {
      apiMocker(app, path.resolve('./mock/index.js'))
    }
  },
```
在`before`方法中使用`mocker-api`插件来拦截请求，并把请求的结果用`mock`数据代替

- 书写`mockapi`请求配置文件 
```
# mock/index.js
const Mock = require('mockjs')
module.exports = {
  'GET /api/message': Mock.mock({
    'string|1-10': 'sting'
  })
}
```

如上配置之后 当我们请求`http://localhost:9529/api/message`,就会被`api`拦截然后返回mock数据
