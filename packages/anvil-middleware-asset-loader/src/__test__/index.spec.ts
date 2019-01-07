import { init as subject } from '../index'
import httpMocks from 'node-mocks-http'

let instance
let instanceMiddlewareOnly
let requestMock
let responseMock
let next

const FakeLoader = {
  getHashedAssets: jest.fn()
}

jest.mock(
  '../resource-hints/AssetLoaderWithHints',
  () => {
    return function() {
      return jest.fn().mockImplementation(() => FakeLoader)
    }
  },
  { virtual: true }
)

beforeEach(() => {
  instance = subject({ hostStaticAssets: true })
  instanceMiddlewareOnly = subject({})
  requestMock = httpMocks.createRequest()
  responseMock = httpMocks.createResponse({})
  next = jest.fn()
})

afterEach(() => {
  instance = null
  instanceMiddlewareOnly = null
  jest.clearAllMocks()
})

describe('anvil-server-ft-asset-loader', () => {
  it('returns an Array of functions', () => {
    expect(instance).toBeInstanceOf(Array)
    expect(instance[0]).toBeInstanceOf(Function)
    expect(instance[1]).toBeInstanceOf(Function)
  })

  describe('middleware', () => {
    it('calls the fallthrough function', () => {
      instance[0](requestMock, responseMock, next)
      expect(next).toHaveBeenCalled()
    })

    it('intercepts the default response.send() method', () => {
      instance[0](requestMock, responseMock, next)

      responseMock.send('Hello World')

      expect(responseMock._headers).toHaveProperty('link')
      expect(responseMock._isEndCalled()).toEqual(true)
    })

    it('assigns an instance of the loader to response.locals', () => {
      instance[0](requestMock, responseMock, next)
      expect(responseMock.locals.assets).toBeDefined()
    })
  })

  describe('router', () => {
    it('returns an instance of the router if hostStaticAssets is set to true', () => {
      instance[0](requestMock, responseMock, next)
      expect(instance[1].name).toEqual('router')
    })

    it('does not return the router if hostStaticAssets is set to false', () => {
      instanceMiddlewareOnly[0](requestMock, responseMock, next)
      expect(instanceMiddlewareOnly[1]).toBeUndefined()
    })
  })
})
