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
			{ text: 'gitHub', link: 'https://github.com/G-Tristin/vue' }
		],
		sidebarDepth:1,
		sidebar: {
			'/guide/': ['', 'one','markdown'],
			'/home/': ['html5', 'css', 'javascript'],
			'/vue/': ['', 'vueLoad'],
			'/ES6/':['','object']
		}
	}
}
