import * as subject from '../navigation'
import httpMocks from 'node-mocks-http'

const fakeNavigationData = {
  'navbar-uk': {
    label: 'Navbar UK',
    items: [{ label: 'Foo', url: '#' }]
  },
  'navbar-international': {
    label: 'Navbar International',
    items: [{ label: 'Foo', url: '#' }]
  },
  'drawer-uk': {
    label: 'Drawer UK',
    items: [{ label: 'Foo', url: '#' }]
  },
  'drawer-international': {
    label: 'Drawer International',
    items: [{ label: 'Bar', url: '#' }]
  }
}

const fakeEditionsData = {
  'editions-uk': {
    current: { id: 'uk', name: 'UK', url: '/' },
    others: [{ id: 'international', name: 'International', url: '/' }]
  },
  'editions-international': {
    current: { id: 'international', name: 'International', url: '/' },
    others: [{ id: 'uk', name: 'UK', url: '/' }]
  }
}

const fakeSubNavigationResponse = {
  breadcrumb: 'some-breadcrumb',
  subsections: 'some-subsections'
}

const fakeNavigationDataUK = {
  navbar: fakeNavigationData['navbar-uk'],
  drawer: fakeNavigationData['drawer-uk'],
  editions: fakeEditionsData['editions-uk']
}

const fakeNavigationDataIntl = {
  navbar: fakeNavigationData['navbar-international'],
  drawer: fakeNavigationData['drawer-international'],
  editions: fakeEditionsData['editions-international']
}

const FakePoller = {
  start: jest.fn(),
  getNavigationFor: jest.fn().mockImplementation(() => fakeNavigationData),
  getSubNavigationFor: jest.fn().mockImplementation(() => fakeSubNavigationResponse)
}

jest.mock(
  '@financial-times/anvil-server-ft-navigation',
  () => {
    return {
      Navigation: jest.fn().mockImplementation(() => FakePoller)
    }
  },
  { virtual: true }
)

describe('anvil-middleware-ft-navigation/index', () => {
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
      expect(response.locals.navigation).toEqual(expect.objectContaining(fakeNavigationDataUK))
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
      expect(response.locals.navigation).toEqual(expect.objectContaining(fakeSubNavigationResponse))
    })
  })

  describe('when handling a request with the edition set to international', () => {
    let request

    beforeEach(() => {
      request = httpMocks.createRequest({ query: { edition: 'international' } })
    })

    it('returns the international edition data', async () => {
      await instance(request, response, next)
      expect(response.locals.navigation).toEqual(expect.objectContaining(fakeNavigationDataIntl))
    })
  })

  describe('when something goes wrong', () => {
    beforeEach(() => {
      FakePoller.getNavigationFor = jest.fn(() => {
        throw Error('Whoops')
      })
    })

    it('catches the error safely', async () => {
      await instance(request, response, next)
      expect(next).toHaveBeenCalledWith(expect.any(Error))
    })
  })
})
