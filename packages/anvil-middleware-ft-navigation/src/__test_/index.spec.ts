import { init as subject } from '../index'
import httpMocks from 'node-mocks-http'

const fakeNavigation = {
  navbar: 'navbar-uk',
  drawer: 'drawer-uk'
}

const fakeCrumbtrail = {
  breadcrumb: 'some-breadcrumb',
  subsections: 'some-subsections'
}

const FakePoller = {
  start: jest.fn(),
  getNavigation: jest.fn().mockImplementation(() => fakeNavigation),
  getCrumbtrail: jest.fn().mockImplementation(() => fakeCrumbtrail)
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

jest.mock('../assignNavigationData', () => {
  return {
    getNavigationForEdition: jest.fn().mockImplementation(() => fakeNavigation)
  }
})

describe('anvil-middleware-ft-navigation/index', () => {
  let instance
  let instanceWithCrumbtrail
  let requestMock
  let responseMock
  let responseMockNoEditions
  let next

  beforeEach(() => {
    instance = subject()
    instanceWithCrumbtrail = subject({ enableCrumbtrail: true })
    requestMock = httpMocks.createRequest()
    responseMock = httpMocks.createResponse({
      locals: { editions: { current: { id: 'some-edition-id' } } }
    })
    responseMockNoEditions = httpMocks.createResponse({
      locals: {}
    })
    next = jest.fn()
  })

  afterEach(() => {
    instance = null
    instanceWithCrumbtrail = null
    jest.clearAllMocks()
  })

  it('returns a function', () => {
    expect(instance).toBeInstanceOf(Function)
    expect(instanceWithCrumbtrail).toBeInstanceOf(Function)
  })

  describe('without the enableCrumbtrail option', () => {
    it('sets the navigation properties on response.locals', async () => {
      await instance(requestMock, responseMock, next)
      expect(responseMock.locals.navigation.main).toEqual(fakeNavigation)
    })
    it('does not set the crumbtrail properties on response.locals', async () => {
      await instance(requestMock, responseMock, next)
      expect(responseMock.locals.navigation.crumbtrail.breadcrumb).toBeNull()
      expect(responseMock.locals.navigation.crumbtrail.subsections).toBeNull()
    })
    it('calls the fallthrough function', async () => {
      await instance(requestMock, responseMock, next)
      expect(next).toHaveBeenCalled()
    })
  })

  describe('with the enableCrumbtrail option', () => {
    it('sets the crumbtrail properties on response.locals', async () => {
      await instanceWithCrumbtrail(requestMock, responseMock, next)
      expect(responseMock.locals.navigation.crumbtrail.breadcrumb).toEqual(fakeCrumbtrail.breadcrumb)
      expect(responseMock.locals.navigation.crumbtrail.subsections).toEqual(fakeCrumbtrail.subsections)
    })
    it('calls the fallthrough function', async () => {
      await instanceWithCrumbtrail(requestMock, responseMock, next)
      expect(next).toHaveBeenCalled()
    })
  })

  describe('on error', () => {
    const invalidResponseMock = null
    it('catches the error', async () => {
      await instance(requestMock, invalidResponseMock, next)
      expect(next).toHaveBeenCalledWith(expect.any(Error))
    })
  })

  describe('without editions data', () => {
    it('can handle an empty response.locals', async () => {
      await instance(requestMock, responseMockNoEditions, next)
      expect(responseMockNoEditions.locals.navigation.main).toEqual(fakeNavigation)
    })
  })
})
