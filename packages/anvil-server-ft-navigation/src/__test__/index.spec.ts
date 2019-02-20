import nock from 'nock'

import { Navigation } from '../'

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
})
