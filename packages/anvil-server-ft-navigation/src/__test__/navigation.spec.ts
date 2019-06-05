import nock from 'nock'
import { Navigation } from '..'
import navigationData from '../../../../__fixtures__/menus.json'

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
    let result

    beforeAll(async () => {
      result = await navigationInstance.getNavigationFor('/', 'uk')
    })

    it('returns the shared menu data', () => {
      expect(result).toHaveProperty('account')
      expect(result).toHaveProperty('footer')
      expect(result).toHaveProperty('user')
    })

    it('returns the edition specific menu data', () => {
      expect(result).toHaveProperty('drawer')
      expect(result).toHaveProperty('navbar')
    })

    it('returns the editions data', () => {
      expect(result).toHaveProperty('editions')
    })

    it('returns the current path', () => {
      expect(result).toHaveProperty('currentPath', '/')
    })
  })

  // nock used here because SubNavigation fetches its data directly rather than pulling from Poller
  describe('.getSubNavigationFor()', () => {
    describe('when things go well', () => {
      let result

      beforeAll(async () => {
        nock('http://next-navigation.ft.com')
          .get('/v2/hierarchy/streamPage')
          .reply(200, clone(subNavigationData))

        result = await navigationInstance.getSubNavigationFor('streamPage')
      })

      it('fetches the sub-navigation data', () => {
        expect(Object.isFrozen(result)).toEqual(true)
        expect(result).toHaveProperty('breadcrumb')
        expect(result).toHaveProperty('subsections')
      })

      it('appends the current page to the list of ancestors', () => {
        expect(result.breadcrumb.length).toEqual(2)
      })

      it('appends a selected property to the current page', () => {
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
