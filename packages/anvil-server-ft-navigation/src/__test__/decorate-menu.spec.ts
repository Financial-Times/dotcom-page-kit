import { decorateMenu } from '../decorate-menu'

const submenu = {
  label: 'submenu',
  items: [
    { label: 'Baz', url: '/world/uk', submenu: null },
    { label: 'Qux', url: '/fake-item-nested?location=${currentPath}', submenu: null }
  ]
}

const menu = {
  'drawer-uk': {
    label: 'Drawer',
    items: [
      { label: 'Foo', url: '/world/uk', submenu: null },
      { label: 'Bar', url: '/fake-item?location=${currentPath}', submenu }
    ]
  }
}

describe('decorateMenu', () => {
  it('returns a decorated object rather than mutating in place', () => {
    const clone = JSON.parse(JSON.stringify(menu))
    const decorated = decorateMenu(menu['drawer-uk'], '/world/uk')
    expect(clone).toEqual(menu)
    expect(decorated).not.toEqual(menu)
  })

  it('it marks items whose `url` property matches `currentUrl` as `selected`', () => {
    const decorated = decorateMenu(menu['drawer-uk'], '/world/uk')

    expect(decorated.items[0].selected).toBe(true)
    expect(decorated.items[1].submenu.items[0].selected).toBe(true)
  })

  it('replaces the ${currentPath} query string param with the value of currentUrl', () => {
    const decorated = decorateMenu(menu['drawer-uk'], '/world/us/politics')
    expect(decorated.items[1].url).toBe('/fake-item?location=/world/us/politics')
    expect(decorated.items[1].submenu.items[1].url).toBe('/fake-item-nested?location=/world/us/politics')
  })

  it('replaces URLs containing keywords with %2F', () => {
    const testKeyword = (itemUrl: string) => {
      const decorated = decorateMenu(menu['drawer-uk'], itemUrl)
      expect(decorated.items[1].url).toBe('/fake-item?location=%2F')
      expect(decorated.items[1].submenu.items[1].url).toBe('/fake-item-nested?location=%2F')
    }

    testKeyword('/uk/products/bar')
    testKeyword('/world/barriers')
    testKeyword('/world/us/errors')
  })
})
