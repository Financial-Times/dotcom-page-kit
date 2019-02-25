import nock from 'nock'

import { Navigation } from '..'
import { menus as navigationData } from '../__fixtures__/menus'

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

  describe('getPathMenu', () => {
    it('returns a decorated object', async () => {
      const pathMenu = await navigationInstance.getPathMenu('drawer-uk', '/world/uk')

      expect(pathMenu.items[0].selected).toBe(true)
      expect(pathMenu.items[1].submenu.items[0].selected).toBe(true)
      expect(pathMenu.items[1].url).toBe('/fake-item?location=/world/uk')
      expect(pathMenu.items[1].submenu.items[1].url).toBe('/fake-item-nested?location=/world/uk')
    })
  })

  // nock used here because Crumbtrail fetches its data directly rather than pulling from Poller
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
})
