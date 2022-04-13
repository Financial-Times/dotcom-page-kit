import * as subject from '../navigation'
import httpMocks from 'node-mocks-http'

const fakeMenusData = {
  navbar: {
    label: 'Navbar UK',
    items: [{ label: 'Foo', url: '#' }]
  },
  drawer: {
    label: 'Drawer UK',
    items: [{ label: 'Foo', url: '#' }]
  }
}

const fakeEditionsData = {
  current: { id: 'uk', name: 'UK', url: '/' },
  others: [{ id: 'international', name: 'International', url: '/' }]
}

const fakeActionsData = { id: 'subscribe', name: 'Subscribe for full access', url: '/products?' }

const fakeSubNavigationData = {
  breadcrumb: 'some-breadcrumb',
  subsections: 'some-subsections'
}

const fakeNavigationData = { ...fakeMenusData, editions: fakeEditionsData, currentPath: '' }

const FakeNavigation = {
  getSubscribeAction: jest.fn().mockResolvedValue(fakeActionsData),
  getMenusFor: jest.fn().mockResolvedValue(fakeMenusData),
  getSubNavigationFor: jest.fn().mockResolvedValue(fakeSubNavigationData),
  getEditionsFor: jest.fn().mockReturnValue(fakeEditionsData)
}

jest.mock(
  '@financial-times/dotcom-server-navigation',
  () => {
    return {
      Navigation: jest.fn().mockImplementation(() => FakeNavigation)
    }
  },
  { virtual: true }
)

describe('dotcom-middleware-navigation', () => {
  let request
  let response
  let next
  let instance

  beforeEach(() => {
    request = httpMocks.createRequest()
    response = httpMocks.createResponse({ locals: {} })
    next = jest.fn()
    instance = subject.init()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('returns a middleware function', () => {
    expect(instance).toBeInstanceOf(Function)
    expect(instance.length).toBe(3)
  })

  describe('when handling a request', () => {
    it('appends the navigation properties to response.locals', async () => {
      await instance(request, response, next)
      expect(response.locals.navigation).toEqual(expect.objectContaining(fakeNavigationData))
    })

    it('prefers the vanity URL if set', async () => {
      const request = httpMocks.createRequest({
        path: '/path/to/app/1234',
        headers: {
          'ft-vanity-url': '/vanity-url'
        }
      })

      await instance(request, response, next)
      expect(FakeNavigation.getMenusFor).toHaveBeenCalledWith('/vanity-url', 'uk')
    })

    it('calls the fallthrough function', async () => {
      await instance(request, response, next)
      expect(next).toHaveBeenCalled()
    })
  })

  describe('when handling a request with sub-navigation enabled', () => {
    let instance

    beforeEach(() => {
      instance = subject.init({ enableSubNavigation: true })
    })

    it('prefers the path provided by the vanity URL header when available', async () => {
      request = httpMocks.createRequest({
        path: '/path/to/page/123',
        headers: {
          'ft-vanity-url': '/vanity-url'
        }
      })

      await instance(request, response, next)

      expect(FakeNavigation.getSubNavigationFor).toHaveBeenCalledWith('/vanity-url')
    })

    it('normalizes the current path', async () => {
      request = httpMocks.createRequest({
        path: '/path/to/page/123',
        query: {
          page: 2
        },
        headers: {
          'ft-vanity-url': '/vanity-url?page=2'
        }
      })

      await instance(request, response, next)

      expect(FakeNavigation.getSubNavigationFor).toHaveBeenCalledWith('/vanity-url')
    })

    it('appends the sub-navigation properties on response.locals for the current path', async () => {
      await instance(request, response, next)
      expect(response.locals.navigation).toEqual(expect.objectContaining(fakeSubNavigationData))
    })

    it('fails silently if the the sub-navigation request fails', async () => {
      FakeNavigation.getSubNavigationFor.mockRejectedValueOnce(new Error('Fail'))

      await instance(request, response, next)

      expect(next).not.toHaveBeenCalledWith(expect.any(Error))
    })
  })

  describe('when handling a request with a custom getCurrentPath', () => {
    it('executes the provided getCurrentPath function', async () => {
      request = httpMocks.createRequest({
        path: '/path/to/page/123',
        headers: {
          'ft-vanity-url': '/vanity-url?page=2'
        }
      })
      const dummyPath = '/foo'
      const instance = subject.init({ getCurrentPath: () => dummyPath })
      await instance(request, response, next)

      expect(FakeNavigation.getMenusFor).toHaveBeenCalledWith(dummyPath, 'uk')
    })

    it('allows overriding of how to calculate current path logic', async () => {
      request = httpMocks.createRequest({
        path: '/path/to/page/123',
        headers: {
          'ft-blocked-url': '/ig-content-test'
        }
      })

      const instance = subject.init({ getCurrentPath: (request) => request.get('ft-blocked-url') })
      await instance(request, response, next)

      expect(FakeNavigation.getMenusFor).toHaveBeenCalledWith('/ig-content-test', 'uk')
    })
  })

  describe('when something goes wrong', () => {
    beforeEach(() => {
      FakeNavigation.getMenusFor = jest.fn(() => {
        throw Error('Whoops')
      })
    })

    it('catches the error safely', async () => {
      await instance(request, response, next)
      expect(next).toHaveBeenCalledWith(expect.any(Error))
    })
  })
})
