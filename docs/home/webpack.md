# webpack

## 一、webpack的基础知识

1.核心概念

- Entry：入口，webpack构建文件的起点

- Module：模块，在webpack当中一切解释模块，一个模块对应着一个文件。webpack会从配置的Entry开始递归找出所有的依赖模块。、

- Chunk：代码块，一个代码块由多个模块构成，用于代码的合并与分割

- Loader：模块转换器，用于把模块原内容按照需求转换成新内容

- Plugin：扩展插件，在Webpack构建流程当中的特定时机注入扩展逻辑来改变构建结果或者添加你想要做的事情

- Output：输出结果,在Webpack经过一系列处理并得出最终想要的代码后输出结果

2.webpack的工作流程
在Webpack当中一切皆模块,Webpack能够根据模块间的依赖关系将它们组合打包,将浏览器不能直接运行的拓展语言(typeScript,Scss等),转换成浏览器能够直接运行的静态资源.

- webpack启动后会从Entry里配置的Module开始递归解析Entry依赖的所有的Module.

- 每找到一个Module,就会根据配置的loader去找到对应的转换规则,对Module进行转换后,再解析出当前Moduel依赖的module.

- 这些模块会以Entry为单位进行分组,一个Entry和其所有依赖的Module被分到一个组也就是一个Chunk.

- 最后Webpack会把所有Chunk转换成文件输出.在整个流程中webpack会在恰当的时机执行Plugin里定义的逻辑.
