import { init as subject } from '../index'
import httpMocks from 'node-mocks-http'

let instance
let instanceMiddlewareOnly
let requestMock
let responseMock
let nextMock

const FakeLoader = {
  getPublicPath: jest.fn(),
  addResourceHint: jest.fn(),
  formatResourceHints: jest.fn(),
  getPublicPathAndHint: jest.fn()
}

jest.mock(
  '../ExtendedAssetLoader',
  () => {
    return jest.fn().mockImplementation(() => FakeLoader)
  },
  { virtual: true }
)

beforeEach(() => {
  instance = subject({ hostStaticAssets: true })
  instanceMiddlewareOnly = subject({ hostStaticAssets: false })
  requestMock = httpMocks.createRequest()
  responseMock = httpMocks.createResponse()
  nextMock = jest.fn()
})

afterEach(() => {
  instance = null
  instanceMiddlewareOnly = null
  jest.clearAllMocks()
})

describe('anvil-middleware-asset-loader', () => {
  it('returns an Array of functions', () => {
    expect(instance).toBeInstanceOf(Array)
    expect(instance[0]).toBeInstanceOf(Function)
    expect(instance[1]).toBeInstanceOf(Function)
  })

  describe('middleware', () => {
    it('calls the fallthrough function', () => {
      instance[0](requestMock, responseMock, nextMock)
      expect(nextMock).toHaveBeenCalled()
    })

    it('assigns an instance of the asset loader to response.locals', () => {
      instance[0](requestMock, responseMock, nextMock)
      expect(responseMock.locals.assets).toBeDefined()
    })

    it('intercepts the default response.send() method and appends link header', () => {
      instance[0](requestMock, responseMock, nextMock)

      responseMock.send('Hello World')

      expect(responseMock._headers).toHaveProperty('link')
      expect(responseMock._isEndCalled()).toEqual(true)
    })
  })

  describe('router', () => {
    it('returns an instance of the router if hostStaticAssets is set to true', () => {
      instance[0](requestMock, responseMock, nextMock)
      expect(instance[1].name).toEqual('router')
    })

    it('does not return the router if hostStaticAssets is set to false', () => {
      instanceMiddlewareOnly[0](requestMock, responseMock, nextMock)
      expect(instanceMiddlewareOnly[1]).toBeUndefined()
    })
  })
})
