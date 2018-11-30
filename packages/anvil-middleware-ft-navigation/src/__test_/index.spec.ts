import subject from '../index'
import httpMocks from 'node-mocks-http'

const fakeNavigation = { 'some-navigation-data': true }

const fakeCrumbtrail = {
  'breadcrumb': 'some-breadcrumb',
  'subsections': 'some-subsections'
}

const FakePoller = {
  start: jest.fn(),
  getNavigation: jest.fn().mockImplementation(() => fakeNavigation),
  getCrumbtrail: jest.fn().mockImplementation(() => fakeCrumbtrail)
}

jest.mock('@financial-times/anvil-server-ft-navigation', () => {
  return {
    Navigation: jest.fn().mockImplementation(() => FakePoller)
  }
})

describe('anvil-middleware-ft-navigation', () => {
  let instance
  let instanceWithCrumbtrail
  let requestMock
  let responseMock
  let next

  beforeEach(() => {
    instance = subject(),
    instanceWithCrumbtrail = subject({ enableCrumbtrail: true })
    requestMock = httpMocks.createRequest()
    responseMock = httpMocks.createResponse({
      locals: {
        crumbtrail: null,
        navigation: '',
        testProperty: 'test'
      }
    })
    next = jest.fn()
  })

  afterEach(() => {
    instance = null,
    instanceWithCrumbtrail = null
    jest.clearAllMocks()
  })

  describe('the middleware', async () => {
    it('returns a function', () => {
      expect(instance).toBeInstanceOf(Function)
      expect(instanceWithCrumbtrail).toBeInstanceOf(Function)
    })
  })

  describe('without the enableCrumbtrail option', async () => {
    it('sets the navigation properties on response.locals', async () => {
      await instance(requestMock, responseMock, next)
      expect(responseMock.locals.navigation).toBeTruthy(),
      expect(responseMock.locals.navigation).toEqual(fakeNavigation)
    })
    it('does not set the crumbtrail properties on response.locals', async () => {
      await instance(requestMock, responseMock, next)
      expect(responseMock.locals.crumbtrail).toEqual({})
    })
    it('calls the fallthrough function', async () => {
      await instance(requestMock, responseMock, next)
      expect(next).toHaveBeenCalled()
    })
  })

  describe('with the enableCrumbtrail option', () => {
    it('sets the navigation properties on response.locals', async () => {
      await instanceWithCrumbtrail(requestMock, responseMock, next)
      expect(responseMock.locals.navigation).toBeTruthy()
    })
    it('sets the crumbtrail properties on response.locals', async () => {
      await instanceWithCrumbtrail(requestMock, responseMock, next)
      expect(responseMock.locals.crumbtrail.breadcrumb).toEqual(fakeCrumbtrail.breadcrumb)
      expect(responseMock.locals.crumbtrail.subsections).toEqual(fakeCrumbtrail.subsections)
    })
    it('calls the fallthrough function', async () => {
      await instance(requestMock, responseMock, next)
      expect(next).toHaveBeenCalled()
    })
  })

  describe('on error', () => {
    it('catches the error', async() => {
      await instance(requestMock, responseMock, next)
      expect(next).toHaveBeenCalledWith(expect.any(Error))
    })
  })
})
