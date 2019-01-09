# npm的一些基本功能

## 查看一个本地包的版本信息

以jq为例

`npm ls jquery`  即可（查看本地安装的jQuery）

`npm ls jquery -g `   (查看全局安装的jquery)

## 跟新一个本地的包

npm update jquery@版本号  

npm update jquery@版本号 -g

## 查看一个包的所有版本号

npm view jquery versions

## 查看一个包的最新版本号

npm view jquery version