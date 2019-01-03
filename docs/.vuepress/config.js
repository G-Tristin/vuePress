module.exports = {
	title: '修罗之路',
	description: '做想做的事，爱想爱的人',
	themeConfig: {
		nav: [
			{
				text: '前端',
				items: [
					{ text: 'HTML', link: '/home/html5' },
					{ text: 'CSS', link: '/home/css' },
					{ text: 'Javascript', link: '/home/javascript' }
				]
			},
			{ text: 'Vue', link: '/vue/' },
			{ text: 'node', link: '/node/' },
			{ text: 'ES6', link: '/ES6/' },
			{text:'命令行',link:'/commander/'},
			{ text: 'gitHub', link: 'https://github.com/G-Tristin/vue' }
		],
		sidebarDepth:1,
		sidebar: {
			'/guide/': ['', 'one','markdown'],
			'/home/': ['html5', 'css', 'javascript'],
			'/vue/': ['', 'vueLoad'],
			'/ES6/':['','object'],
			'/node/':['','node入门','node基本模块','node输入输出流','http服务','express','express静态资源处理','koa',],
			'/commander/':['','option与action']
		}
	}
}
