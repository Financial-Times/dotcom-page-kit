const meganav = [
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
    data: [{ label: 'Mega Baz', url: '/content/baz' }, { label: 'Mega Qux', url: '/content/qux' }]
  }
]

const submenu = {
  label: 'submenu',
  items: [
    { label: 'Baz', url: '/world/uk', submenu: null },
    { label: 'Qux', url: '/fake-item-nested?location=${currentPath}', submenu: null }
  ]
}

const menus = {
  'navbar-uk': {
    label: 'Navigation',
    items: [
      { label: 'Foo', url: '/world/uk', submenu: null },
      { label: 'Bar', url: '/fake-item?location=${currentPath}', submenu, meganav }
    ]
  }
}

module.exports = { menus }
