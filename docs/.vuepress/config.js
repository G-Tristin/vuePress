module.exports = {
	title: '梦想之路',
	description: '起风了，依旧要坚强的活下去',
	themeConfig: {
		nav: [
			{
				text: 'web',
				items: [
					{
						text: 'HTML',
						link: '/home/html5'
					},
					{
						text: 'CSS',
						link: '/home/css'
					},
					{
						text: 'Javascript',
						link: '/home/javascript'
					},
					{
						text: 'Gulp',
						link: '/home/gulp'
					},
					{
						text: 'Webpack',
						link: '/home/webpack'
					},
					{
						text: 'polyfill',
						link: '/home/polyfill'
					},
					{
						text:'babel',
						link:'/home/babel'
					},
					{
						text:'ts',	
						link:'/home/ts'
					}
				]
			},
			{
				text: 'Vue',
				link: '/vue/'
			},
			{
				text: 'React',
				link: '/react/'
			},
			{
				text: 'node',
				link: '/node/'
			},
			{
				text: 'ES6',
				link: '/ES6/'
			},
			{
				text: '命令行',
				link: '/commander/'
			},
			{
				text: 'gitHub',
				link: 'https://github.com/G-Tristin/vue'
			}
		],
		sidebarDepth: 1,
		sidebar: {
			'/web/':['html5', 'css', 'javascript', 'gulp', 'webpack', 'polyfill','babel'],
			'/guide/': ['', 'markdown'],
			'/home/': ['html5', 'css', 'javascript', 'gulp', 'webpack', 'polyfill','babel','context','ts'],
			'/vue/': ['', 'first','lib-flexible', 'vueLoad'],
			'/ES6/': ['', 'object','es6class','es6class-extend'],
			'/node/': ['','buffer','process' ,'childProcess','stream','commonjs', 'node基本模块', 'node输入输出流', 'http服务', 'express', 'express静态资源处理', 'koa', 'npm'],
			'/commander/': ['', 'option与action', 'publish'],
			'/react/': ['', '受控组件', '状态提升与slot', 'redux.md']
		}
	}
}