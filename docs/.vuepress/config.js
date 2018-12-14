module.exports = {
	title: 'welcome myFriend!',
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
			{ text: 'node', link: '/node/' },
			{ text: 'ES6', link: '/ES6/' },
			{ text: 'gitHub', link: 'https://github.com/G-Tristin/vue' }
		],
		sidebar: ['/blog/css', '/blog/html', '/blog/javascript']
	}
}
