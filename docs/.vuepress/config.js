module.exports = {
	title: '修罗之路',
	description: '做想做的事，爱想爱的人',
	themeConfig: {
		nav: [{
				text: '前端',
				items: [{
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
						link: '/home/webpack'
					},
					{
						text:'babel',
						link:'/home/babel'
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
			'/guide/': ['', 'one', 'markdown'],
			'/home/': ['html5', 'css', 'javascript', 'gulp', 'webpack', 'polyfill','babel'],
			'/vue/': ['', 'first', 'vueLoad'],
			'/ES6/': ['', 'object','es6class','es6class-extend'],
			'/node/': ['', 'commonjs', 'node基本模块', 'node输入输出流', 'http服务', 'express', 'express静态资源处理', 'koa', 'npm'],
			'/commander/': ['', 'option与action', 'publish'],
			'/react/': ['', '受控组件', '状态提升与slot', 'redux.md']
		}
	}
}