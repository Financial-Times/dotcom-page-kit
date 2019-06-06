import { decorateMenuData as subject } from '../decorateMenuData'
import { menus } from '../__fixtures__/menus'
import dlv from 'dlv'

describe('anvil-server-ft-navigation/src/decorateMenuData', () => {
  describe('.decorateMenu()', () => {
    it('returns a new deeply cloned object rather than mutating in place', () => {
      const decorated = subject(menus['navbar-uk'], '/world/uk')

      expect(decorated).not.toBe(menus['navbar-uk'])
      expect(decorated.items).not.toBe(menus['navbar-uk'].items)
      expect(decorated.items[0]).not.toBe(menus['navbar-uk'].items[0])
    })

    it('marks menu items whose `url` property matches `currentPath` as `selected`', () => {
      const decorated = subject(menus['navbar-uk'], '/world/uk')

      const a = dlv(decorated, ['items', 0])
      const b = dlv(decorated, ['items', 1, 'submenu', 'items', 0])
      const c = dlv(decorated, ['items', 1, 'meganav', 0, 'data', 1, 0])
      const d = dlv(decorated, ['items', 1])

      expect(a.selected).toBe(true)
      expect(b.selected).toBe(true)
      expect(c.selected).toBe(true)
      expect(d.selected).toBe(false)
    })

    it('replaces the ${currentPath} placeholder with the value of `currentPath`', () => {
      const decorated = subject(menus['navbar-uk'], '/world/us/politics')

      const a = dlv(decorated, ['items', 1])
      const b = dlv(decorated, ['items', 1, 'submenu', 'items', 1])
      const c = dlv(decorated, ['items', 1, 'meganav', 1, 'data', 1])

      expect(a.url).toBe('/fake-item?location=/world/us/politics')
      expect(b.url).toBe('/fake-item-nested?location=/world/us/politics')
      expect(c.url).toBe('/content/qux?location=/world/us/politics')
    })

    it('replaces the ${currentPath} placeholder with %2F in URLs which contain keywords', () => {
      const testKeyword = (itemUrl: string) => {
        const decorated = subject(menus['navbar-uk'], itemUrl)

        const a = dlv(decorated, ['items', 1, 'url'])
        const b = dlv(decorated, ['items', 1, 'submenu', 'items', 1, 'url'])

        expect(a).toBe('/fake-item?location=%2F')
        expect(b).toBe('/fake-item-nested?location=%2F')
      }

      testKeyword('/uk/products/bar')
      testKeyword('/world/barriers')
      testKeyword('/world/us/errors')
    })

    it('can clone submenu properties', () => {
      const decorated = subject(menus.footer, '/world/uk')
      const submenu = dlv(decorated, ['items', 0, 'submenu', 'items'])

      submenu.forEach((column) => {
        column.forEach((menuItem) => {
          expect(menuItem).toHaveProperty('label')
          expect(menuItem).toHaveProperty('url')
          expect(menuItem).toHaveProperty('selected')
        })
      })
    })

    it('can clone meganav properties', () => {
      const decorated = subject(menus['navbar-uk'], '/world/uk')
      const meganav = dlv(decorated, ['items', 1, 'meganav'])

      expect(meganav[0]).toHaveProperty('component', 'sectionlist')
      expect(meganav[0]).toHaveProperty('title', 'Sections')
      expect(meganav[0]).toHaveProperty('data')

      expect(meganav[1]).toHaveProperty('component', 'articlelist')
      expect(meganav[1]).toHaveProperty('title', 'Most Read')
      expect(meganav[1]).toHaveProperty('data')
    })
  })
})
