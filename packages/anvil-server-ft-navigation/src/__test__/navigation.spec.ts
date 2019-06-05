import nock from 'nock'
import { Navigation } from '..'
import { menus as navigationData } from '../__fixtures__/menus'
import * as expected from '../__fixtures__/expected'

const subNavigationData = {
  ancestors: [{ label: 'some-ancestors' }],
  children: [{ label: 'some-children' }],
  item: { label: 'some-data-item' }
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
    describe('when things go well', () => {
      let result

      beforeEach(async () => {
        nock('http://next-navigation.ft.com')
          .get('/v2/hierarchy/streamPage')
          .reply(200, clone(subNavigationData))

        result = await navigationInstance.getSubNavigationFor('streamPage')
      })

      it('fetches the sub-navigation data', async () => {
        expect(Object.isFrozen(result)).toEqual(true)
        expect(result).toHaveProperty('breadcrumb')
        expect(result).toHaveProperty('subsections')
      })

      it('appends the current page to the list of ancestors', async () => {
        expect(result.breadcrumb.length).toEqual(2)
      })

      it('appends a selected property to the current page', async () => {
        expect(result.breadcrumb[result.breadcrumb.length - 1].selected).toEqual(true)
      })
    })

    describe('when things go wrong', () => {
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
})
