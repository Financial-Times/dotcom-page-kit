import nock from 'nock'

import { Navigation } from '../'
import { decorateMenu } from '../decorate-selected'
import menus from '../__fixtures__/menus'

const navigationData = {
  testData: 'some-navigation-data',
  testMenu: 'some-menu-data',
  streamPage: 'some-stream-id'
}

const crumbtrailData = {
  testData: 'some-crumbtrail-data',
  ancestors: 'some-ancestors',
  children: 'some-children',
  item: 'some-data-item'
}

const FakePoller = {
  start: jest.fn(),
  getData: jest.fn()
}

jest.mock('ft-poller', () => {
  return jest.fn().mockImplementation(() => FakePoller)
})

const clone = (obj) => JSON.parse(JSON.stringify(obj))

describe('anvil-server-ft-navigation', () => {
  let navigationInstance

  beforeEach(() => {
    FakePoller.start.mockResolvedValue(null)
    FakePoller.getData.mockResolvedValue(clone(navigationData))

    navigationInstance = new Navigation()
  })

  afterEach(() => {
    nock.cleanAll()
    jest.clearAllMocks()
  })

  it('initialises the poller', () => {
    expect(FakePoller.start).toHaveBeenCalled()
  })

  describe('.getNavigationData()', () => {
    it('returns the navigation data', async () => {
      const result = await navigationInstance.getNavigationData()
      expect(result).toEqual(navigationData)
    })
  })

  describe('.getCrumbtrail()', () => {
    it('fetches the crumbtrail data', async () => {
      nock('http://next-navigation.ft.com')
        .get('/v2/hierarchy/streamPage')
        .reply(200, clone(crumbtrailData))
      const result = await navigationInstance.getCrumbtrail('streamPage')

      expect(Object.isFrozen(result.breadcrumb)).toEqual(true)
      expect(Object.isFrozen(result.subsections)).toEqual(true)
    })

    it('throws an HTTP error when fetch fails', async () => {
      nock('http://next-navigation.ft.com')
        .get('/v2/hierarchy/streamPage')
        .reply(500)
      await expect(navigationInstance.getCrumbtrail('streamPage')).rejects.toMatchObject({
        message: 'Navigation crumbtrail for streamPage could not be found.'
      })
    })
  })

  describe('decorateMenu', () => {
    it('it marks items whose `url` property matches `currentUrl` as `selected`', () => {
      const menu = decorateMenu(menus['drawer-uk'], '/world/uk')

      expect(menu.items[0].submenu.items[2].submenu.items[1].selected).toBe(true)
      expect(menu.items[0].submenu.items[3].selected).toBe(true)

      expect(menu.items[0].submenu.items[1].url).toBe('/fake-item?location=/world/uk')
      expect(menu.items[0].submenu.items[2].submenu.items[1].submenu.items[3].url).toBe(
        '/fake-item-nested?location=/world/uk'
      )
    })

    it('replaces the ${currentPath} query string param with the value of currentUrl', () => {
      const menu = decorateMenu(menus['drawer-uk'], '/world/us/politics')
      expect(menu.items[0].submenu.items[1].url).toBe('/fake-item?location=/world/us/politics')
      expect(menu.items[0].submenu.items[2].submenu.items[1].submenu.items[3].url).toBe(
        '/fake-item-nested?location=/world/us/politics'
      )
    })

    it('replaces URLs containing keywords with %2F', () => {
      const testKeyword = (itemUrl: string) => {
        const menu = decorateMenu(menus['drawer-uk'], itemUrl)
        expect(menu.items[0].submenu.items[1].url).toBe('/fake-item?location=%2F')
        expect(menu.items[0].submenu.items[2].submenu.items[1].submenu.items[3].url).toBe(
          '/fake-item-nested?location=%2F'
        )
      }

      testKeyword('/uk/products/bar')
      testKeyword('/world/barriers')
      testKeyword('/world/us/errors')
    })
  })
})
