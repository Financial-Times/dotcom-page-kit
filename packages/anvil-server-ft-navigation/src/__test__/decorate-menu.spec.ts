import { decorateMenu, processMeganav } from '../decorate-menu'
import { menus } from '../__fixtures__/menus'

describe('.decorateMenu()', () => {
  it('returns a decorated object rather than mutating in place', () => {
    const decorated = decorateMenu(menus['navbar-uk'], '/world/uk')

    expect(decorated).not.toBe(menus)
  })

  it('it marks items whose `url` property matches `currentUrl` as `selected`', () => {
    const decorated = decorateMenu(menus['navbar-uk'], '/world/uk')

    expect(decorated.items[0].selected).toBe(true)
    expect(decorated.items[1].submenu.items[0].selected).toBe(true)
    expect(decorated.items[1].meganav[0].data[1][0].selected).toBe(true)
  })

  it('replaces the ${currentPath} query string param with the value of currentUrl', () => {
    const decorated = decorateMenu(menus['navbar-uk'], '/world/us/politics')

    expect(decorated.items[1].url).toBe('/fake-item?location=/world/us/politics')
    expect(decorated.items[1].submenu.items[1].url).toBe('/fake-item-nested?location=/world/us/politics')
  })

  it('replaces URLs containing keywords with %2F', () => {
    const testKeyword = (itemUrl: string) => {
      const decorated = decorateMenu(menus['navbar-uk'], itemUrl)
      expect(decorated.items[1].url).toBe('/fake-item?location=%2F')
      expect(decorated.items[1].submenu.items[1].url).toBe('/fake-item-nested?location=%2F')
    }

    testKeyword('/uk/products/bar')
    testKeyword('/world/barriers')
    testKeyword('/world/us/errors')
  })
})

describe('.processMeganav()', () => {
  it('contains the expected meganav properties', () => {
    const decorated = processMeganav(menus['navbar-uk'].items[1].meganav, '/world/uk')

    expect(decorated[0]).toHaveProperty('component', 'sectionlist')
    expect(decorated[0]).toHaveProperty('title', 'Sections')
    expect(decorated[0]).toHaveProperty('data')

    expect(decorated[1]).toHaveProperty('component', 'articlelist')
    expect(decorated[1]).toHaveProperty('title', 'Most Read')
    expect(decorated[1]).toHaveProperty('data')
  })

  it('contains the expected meganav data', () => {
    const decorated = processMeganav(menus['navbar-uk'].items[1].meganav, '/world/uk')

    expect(Object.keys(decorated[0].data[0][0])).toEqual(['label', 'url', 'selected'])
    expect(Object.keys(decorated[1].data[0])).toEqual(['label', 'url', 'selected'])
  })
})
