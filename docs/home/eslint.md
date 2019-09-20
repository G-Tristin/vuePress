# Eslint格式化代码

## 在vscode当中使用eslint
- 安装eslint插件
- 使用在vscode的配置文件当中设置eslint的配置规则（我不设置 保持编辑器的代码格式化配置的纯净）
- 项目当中的eslint配置，项目当中安装eslint插件。配置.eslintrc文件 他会合并vscode当中的eslint配置并覆盖重叠的配置部分。
- 在配置文件中添加如下配置 保存时按照eslint的规范自动格式化代码。
```
// 保存时使用eslint的规则格式化代码
"eslint.autoFixOnSave": true,
```
## Vue项目使用vsCode格式化代码
由于Vscode编辑器的eslint插件默认下是不能识别`.vue`的文件，所以需要添加如下配置
```
// eslint 添加对Vue的支持
"eslint.validate": [
    "javascript",
    "javascriptreact",
    {
        "language": "vue",
        "autoFix": true
    }
],
```
这是就可以按照eslint的规则格式化`.vue`文件 

- 使用`Vetur`插件
这是一个使用vue时添加代码高亮的常用插件，但是它的默认配置也会在编辑器保存时格式化代码，并且它有自己的格式化代码的规则。这会导致格式化代码与使用eslint的规则格式化代码产生冲突。导致代码格式化2次，并且可能导致eslint报错。所以处理方式是
```
"vetur.format.defaultFormatter.js": "vscode-typescript", // vetur插件格式化改成vscode的eslint的配置
```