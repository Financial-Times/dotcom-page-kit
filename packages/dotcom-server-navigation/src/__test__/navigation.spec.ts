import nock from 'nock'
import { Navigation } from '..'
import menusData from '../../../../__fixtures__/menus.json'

const subNavigationData = {
  ancestors: [{ label: 'some-ancestors' }],
  children: [{ label: 'some-children' }],
  item: { label: 'current-page' }
}

const FakePoller = {
  start: jest.fn(),
  getData: jest.fn()
}

jest.mock('ft-poller', () => {
  return jest.fn().mockImplementation(() => FakePoller)
})

const clone = (obj) => JSON.parse(JSON.stringify(obj))

describe('dotcom-server-navigation', () => {
  let navigationInstance

  beforeEach(() => {
    FakePoller.start.mockResolvedValue(null)
    FakePoller.getData.mockResolvedValue(clone(menusData))

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

  describe('.getMenusData()', () => {
    let result

    beforeAll(async () => {
      result = await navigationInstance.getMenusData()
    })

    it('returns the raw menus data', () => {
      expect(result).toEqual(menusData)
    })
  })

  describe('.getMenusFor()', () => {
    let result

    beforeAll(async () => {
      result = await navigationInstance.getMenusFor('/', 'uk')
    })

    it('returns the shared menu data', () => {
      expect(result).toHaveProperty('account.label', 'Account')
      expect(result).toHaveProperty('footer.label', 'Footer')
      expect(result).toHaveProperty('user.label', 'User')
    })

    it('returns the edition specific menu data', () => {
      expect(result).toHaveProperty('drawer.label', 'Drawer')
      expect(result).toHaveProperty('navbar.label', 'Navigation')
    })

    it('returns decorated menu data', () => {
      expect(result).toHaveProperty('navbar.items.0.selected', true)
      expect(result).toHaveProperty('drawer.items.0.submenu.items.0.selected', true)
    })
  })

  // nock used here because SubNavigation fetches its data directly rather than pulling from Poller
  describe('.getSubNavigationFor()', () => {
    let result

    beforeAll(async () => {
      nock('http://next-navigation.ft.com')
        .get('/v2/hierarchy/streamPage')
        .reply(200, clone(subNavigationData))

      result = await navigationInstance.getSubNavigationFor('/streamPage')
    })

    it('fetches the sub-navigation data', () => {
      expect(result).toHaveProperty('breadcrumb')
      expect(result).toHaveProperty('subsections')
    })

    it('appends the current page to the list of ancestors', () => {
      expect(result).toHaveProperty('breadcrumb.1.label', 'current-page')
    })

    it('appends a selected property to the current page', () => {
      expect(result).toHaveProperty('breadcrumb.1.selected', true)
    })

    describe('when things go wrong', () => {
      it('throws an HTTP 404 error when fetch fails', async () => {
        nock('http://next-navigation.ft.com').get('/v2/hierarchy/streamPage').reply(404)

        await expect(navigationInstance.getSubNavigationFor('streamPage')).rejects.toMatchObject({
          message: 'Sub-navigation for streamPage could not be found.',
          status: 404,
          statusCode: 404
        })
      })
    })
  })

  describe('.getEditionsFor()', () => {
    let result

    beforeAll(async () => {
      result = await navigationInstance.getEditionsFor('uk')
    })

    it('returns the editions data', () => {
      expect(result).toHaveProperty('current')
      expect(result).toHaveProperty('others')
    })

    describe('with an invalid edition', () => {
      it('throws a 400 error', () => {
        expect.assertions(4)
        try {
          navigationInstance.getEditionsFor('london')
          fail('Expected getEditionsFor to throw')
        } catch (err: any) {
          expect(err).toBeInstanceOf(Error)
          expect(err.status).toBe(400)
          expect(err.statusCode).toBe(400)
          expect(err.message).toBe('The provided edition "london" is not a valid edition')
        }
      })
    })
  })
})
