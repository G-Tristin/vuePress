# grep
grep是Linux中最常用的文本处理工具之一，grep与sed、awk合称为linux当中的三剑客

grep 全称为Global search Regular Exprssion and Print out the line

global search 全局搜索

Regular Expression 正则表达式

即:可以利用正则表达式进行全局搜索的意思

作用 从文件中根据搜索的关键字将文件中存在关键字的那一行打印出来

## 基本使用方式

grep -option '关键字' fileName

用例:
```
grep -i 'test' testgrep

从testgrep文件中找出含有test(-i 不区分大小写)的行
```

option:
- -n: 列出行号
- -i: 不区分搜索关键字的大小写
- --color: 将搜索到的关键字高亮
- -c: 统计出搜索关键字出现的行数 并且不再打印出行
- -o: 只打印出被搜索到的关键字 不会把整行信息打出
- -BN: 打印出被搜索到的关键字的那一行以及其前N行  B代表Before
```
grep -B1 'test' testgrep
会把test所在的行以及其前1行打印出来
```
- -AN:  打印出被搜索到的关键字的那一行以及其后N行  B代表After
- -CN: 打印出被搜索到的关键字的那一行以及其前后N行 C代表Context
- -w: 精确匹配当搜索的字符串是一个单独的单词时 才能把这一行打印出来
- -v: 反向查找 查找出不包含搜索关键字的行
- -E: 使用扩展的正则表达式查找 grep默认只支持基本的正则表达式查找

## sed 
linux三大剑客之sed

### 简介
sed英文全称是stream editor。由贝尔实验室开发，如今主流的Unix/Linux操作系统上都集成了这个工具。

