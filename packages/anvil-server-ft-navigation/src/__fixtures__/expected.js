const footer = {
  label: 'Footer',
  items: [
    {
      label: 'Tools',
      url: null,
      selected: false,
      meganav: undefined,
      submenu: {
        label: null,
        items: [
          [
            {
              label: 'Alerts Hub',
              url: 'http://markets.ft.com/data/alerts/',
              submenu: null,
              meganav: undefined,
              selected: false
            },
            {
              label: 'Lexicon',
              url: 'http://lexicon.ft.com/',
              submenu: null,
              meganav: undefined,
              selected: false
            }
          ],
          [
            {
              label: 'News feed',
              url: '/news-feed',
              submenu: null,
              meganav: undefined,
              selected: false
            },
            {
              label: 'Newsletters',
              url: '/newsletters',
              submenu: null,
              meganav: undefined,
              selected: true
            }
          ]
        ]
      }
    }
  ]
}

module.exports = {
  footer
}
