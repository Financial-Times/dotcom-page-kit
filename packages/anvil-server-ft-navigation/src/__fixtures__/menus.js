const submenu = {
  label: 'submenu',
  items: [
    { label: 'Baz', url: '/world/uk', submenu: null },
    { label: 'Qux', url: '/fake-item-nested?location=${currentPath}', submenu: null }
  ]
}

const menus = {
  'drawer-uk': {
    label: 'Drawer',
    items: [
      { label: 'Foo', url: '/world/uk', submenu: null },
      { label: 'Bar', url: '/fake-item?location=${currentPath}', submenu }
    ]
  }
}

module.exports = { menus }
