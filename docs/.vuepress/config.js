module.exports = {
	title: '起风了',
	description: '起风了，仍要坚强的活下去',
	themeConfig: {
		nav: [
			{
				text: 'web',
				items: [
					{ text: 'js', link: '/home/javascript' },
					{ text: 'css', link: '/home/css' },
					{ text: 'babel', link: '/home/babel' },
					{ text: 'context', link: '/home/context' },
					{ text: 'gulp', link: '/home/gulp' },
					{ text: 'html5', link: '/home/html5' },
					{ text: 'polyfill', link: '/home/polyfill' },
					{ text: 'webpack', link: '/home/webpack' },
					{ text: 'eslint', link: '/home/eslint' },
				]
			},
			{
				text: 'Vue',
				items: [
					{ text: 'base', link: '/vue/base' },
					{ text: 'component', link: '/vue/component' },
					{ text: 'lib-flexible', link: '/vue/lib-flexible' },
					{ text: 'vueload', link: '/vue/vueload' },
				]
			},
			{
				text: 'React',
				items: [
					{ text: '受控组件', link: '/react/受控组件' },
					{ text: '状态提升与slot', link: '/react/状态提升与slot' },
					{ text: 'redux', link: '/react/redux' },
				]
			},
			{
				text: 'node',
				items: [
					{ text: 'buffer', link: '/node/buffer' },
					{ text: 'childProcess', link: '/node/childProcess' },
					{ text: 'cluster', link: '/node/cluster' },
					{ text: 'commonjs', link: '/node/commonjs' },
					{ text: 'express', link: '/node/express' },
					{ text: 'express静态资源处理', link: '/node/express静态资源处理' },
					{ text: 'fs', link: '/node/fs' },
					{ text: 'http服务', link: '/node/http服务' },
					{ text: 'koa', link: '/node/koa' },
					{ text: 'nginx', link: '/node/nginx' },
					{ text: 'node基本模块', link: '/node/node基本模块' },
					{ text: 'node输入输出流', link: '/node/node输入输出流' },
					{ text: 'npm', link: '/node/npm' },
					{ text: 'process', link: '/node/process' },
					{ text: 'shell', link: '/node/shell' },
					{ text: 'stream', link: '/node/stream' },
				]
			},
			{
				text: 'ES6',
				items: [
					{ text: '对象的扩展', link: '/ES6/对象的扩展' },
					{ text: '观察者模式', link: '/ES6/观察者模式(发布-订阅)' },
					{ text: '数组的扩展', link: '/ES6/数组的扩展' },
					{ text: 'async', link: '/ES6/async' },
					{ text: 'es6class', link: '/ES6/es6class-extend' },
					{ text: 'object', link: '/ES6/object' },
					{ text: 'promise', link: '/ES6/promise' },
					{ text: 'proxy', link: '/ES6/proxy' },
					{ text: 'iterator', link: '/ES6/iterator' },
				]
			},
			{
				text: 'command',
				link: '/commander/'
			},
			{
				text: 'gitHub',
				link: 'https://github.com/G-Tristin/vue'
			},
			{
				text: 'TS',
				items: [
					{ text: '简介', link: '/ts/README.md' },
					{ text: '声明全局变量', link: '/ts/声明全局变量' },
					{ text: 'npm', link: '/ts/npm' },
					{ text: 'umd', link: '/ts/umd' },
					{ text: '扩展全局变量', link: '/ts/扩展全局变量' },
					{ text: '扩展模块变量', link: '/ts/扩展模块变量' },
				]
			},
			{
				text: 'linux',
				items: [
					{ text: '文件与目录管理', link: '/linux/文件与目录管理.md' },
					{ text: 'grep', link: '/linux/grep.md' },
					{ text: 'PATH', link: '/linux/PATH.md' },
				]
			}
		],
		sidebarDepth: 1,
		sidebar: {
			'/guide/': ['', 'markdown'],
			'/home/': ['', 'html5', 'css', 'javascript', 'gulp', 'webpack', 'polyfill', 'babel'],
			'/vue/': ['', 'base', 'component', 'lib-flexible', 'vueLoad', 'Vue插件开发指北'],
			'/ES6/': ['', 'object', 'es6class', 'es6class-extend', 'promise', 'proxy', '观察者模式(发布-订阅)', 'async', '对象的扩展', '数组的扩展', 'iterator'],
			'/node/': ['', 'buffer', 'process', 'childProcess', 'stream', 'commonjs', 'node基本模块', 'http服务', 'express', 'express静态资源处理', 'koa', 'npm'],
			'/commander/': ['', 'option与action', 'publish'],
			'/react/': ['', '受控组件', '状态提升与slot', 'redux.md'],
			'/ts/': ['', '声明全局变量', 'npm', 'umd', '扩展全局变量', '扩展模块变量']
		}
	}
}