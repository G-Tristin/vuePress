module.exports = {
  title: 'welcome to myGlobs!',
  description: 'Just playing around',
  themeConfig:{
    nav: [
      { 
        text: 'Home',
        items:[
          {'text':'HTML','link':'/home/html5'},
          {'text':'CSS','link':'/home/css'},
          {'text':'Javascript','link':'/home/javascript'}
        ] 
      },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ],
    sidebar:[
      '/blog/css',
      '/blog/html',
      '/blog/javascript'
    ]
  }
}
