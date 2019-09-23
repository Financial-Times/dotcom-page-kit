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

const fakeSubNavigationData = {
  breadcrumb: 'some-breadcrumb',
  subsections: 'some-subsections'
}

const fakeNavigationData = { ...fakeMenusData, editions: fakeEditionsData, currentPath: '' }

const FakeNavigation = {
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

    it('appends the sub-navigation properties on response.locals', async () => {
      await instance(request, response, next)
      expect(response.locals.navigation).toEqual(expect.objectContaining(fakeSubNavigationData))
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
