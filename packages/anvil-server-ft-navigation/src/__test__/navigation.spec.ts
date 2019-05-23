import nock from 'nock'

import { Navigation } from '..'
import { menus as navigationData } from '../__fixtures__/menus'
import * as expected from '../__fixtures__/expected'

const subNavigationData = {
  testData: 'some-sub-navigation-data',
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

  describe('constructor', () => {
    it('initialises the poller', () => {
      expect(FakePoller.start).toHaveBeenCalled()
    })
  })

  describe('.getNavigationData()', () => {
    it('returns the navigation data', async () => {
      const result = await navigationInstance.getNavigationData()
      expect(result).toEqual(navigationData)
    })
  })

  describe('.getNavigationFor()', () => {
    // Verify that
    // - Additional props - meganav, selected, etc - are injected
    // - Items whose url prop matches "/newsletters" have a selected: true
    it('recursively processes menus to produces an expected foter', async () => {
      const result = await navigationInstance.getNavigationFor('/newsletters')
      expect(result.footer).toEqual(expected.footer)
    })
  })

  // nock used here because SubNavigation fetches its data directly rather than pulling from Poller
  describe('.getSubNavigationFor()', () => {
    it('fetches the sub-navigation data', async () => {
      nock('http://next-navigation.ft.com')
        .get('/v2/hierarchy/streamPage')
        .reply(200, clone(subNavigationData))

      const result = await navigationInstance.getSubNavigationFor('streamPage')

      expect(Object.isFrozen(result.breadcrumb)).toEqual(true)
      expect(Object.isFrozen(result.subsections)).toEqual(true)
    })

    it('throws an HTTP error when fetch fails', async () => {
      nock('http://next-navigation.ft.com')
        .get('/v2/hierarchy/streamPage')
        .reply(500)

      await expect(navigationInstance.getSubNavigationFor('streamPage')).rejects.toMatchObject({
        message: 'Sub-navigation for streamPage could not be found.'
      })
    })
  })
})
