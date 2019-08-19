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
				link: '/ES6/'
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
				text:'TS',
				items: [
					{ text: 'interface和type', link: '/ts/interface和type' },
					{ text: 'npm', link: '/ts/npm' },
					{ text: 'umd', link: '/ts/umd' },
					{ text: 'declare-name', link: '/ts/declare-name' },
					{ text: 'declare-global', link: '/ts/declare-global' },
        ]
			}
		],
		sidebarDepth: 1,
		sidebar: {
			'/guide/': ['', 'markdown'],
			'/home/': ['','html5', 'css', 'javascript', 'gulp', 'webpack', 'polyfill','babel'],
			'/vue/': ['', 'base','component','lib-flexible', 'vueLoad'],
			'/ES6/': ['', 'object','es6class','es6class-extend'],
			'/node/': ['','buffer','process' ,'childProcess','stream','commonjs', 'node基本模块', 'http服务', 'express', 'express静态资源处理', 'koa', 'npm'],
			'/commander/': ['', 'option与action', 'publish'],
			'/react/': ['', '受控组件', '状态提升与slot', 'redux.md'],
			'/ts/':['','interface和type','declare-global','declare-name','npm','umd']
		}
	}
}