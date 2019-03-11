import { decorateMenu } from '../decorate-menu'
import { menus } from '../__fixtures__/menus'

describe('decorateMenu', () => {
  it('returns a decorated object rather than mutating in place', () => {
    const decorated = decorateMenu(menus['navbar-uk'], '/world/uk')
    expect(decorated).not.toEqual(menus)
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

