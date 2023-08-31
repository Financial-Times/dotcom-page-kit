import { TNavMenus, TNavMeganav, TNavMenu } from '@financial-times/dotcom-types-navigation'

const meganav: TNavMeganav[] = [
  {
    component: 'sectionlist',
    dataset: 'subsections',
    title: 'Sections',
    data: [[{ label: 'Mega Foo', url: '/world' }], [{ label: 'Mega Bar', url: '/world/uk', submenu: null }]]
  },
  {
    component: 'articlelist',
    dataset: 'popular',
    title: 'Most Read',
    data: [
      { label: 'Mega Baz', url: '/content/baz' },
      { label: 'Mega Qux', url: '/content/qux?location=${currentPath}' }
    ]
  }
]

const submenu: TNavMenu = {
  label: 'submenu',
  items: [
    { label: 'Baz', url: '/world/uk', submenu: null },
    { label: 'Qux', url: '/fake-item-nested?location=${currentPath}', submenu: null }
  ]
}

const menus: Partial<TNavMenus> = {
  'navbar-uk': {
    label: 'Navigation',
    items: [
      { label: 'Foo', url: '/world/uk', submenu: null },
      { label: 'Bar', url: '/fake-item?location=${currentPath}', submenu, meganav }
    ]
  },

  footer: {
    label: 'Footer',
    items: [
      {
        label: 'Tools',
        url: null,
        submenu: {
          label: null,
          items: [
            [
              { label: 'Alerts Hub', url: 'https://markets.ft.com/data/alerts/', submenu: null },
              { label: 'Lexicon', url: 'https://lexicon.ft.com/', submenu: null }
            ],
            [
              { label: 'News feed', url: '/news-feed', submenu: null },
              { label: 'Newsletters', url: '/newsletters', submenu: null }
            ]
          ]
        }
      }
    ]
  }
}

export { menus }
