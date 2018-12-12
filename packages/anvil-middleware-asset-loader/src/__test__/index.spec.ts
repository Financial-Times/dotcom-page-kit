import { init as subject } from '../index'
import httpMocks from 'node-mocks-http'

let instance
let instanceMiddlewareOnly
let requestMock
let responseMock
let next

const FakeLoader = {
  testProperty: jest.fn(),
  getHashedAssets: jest.fn()
}

jest.mock('@financial-times/anvil-server-asset-loader', () => {
  return function() {
    return { AssetLoader: jest.fn().mockImplementation(() => FakeLoader) }
  }
})

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
    it('calls the fallthrough function', async () => {
      await instance[0](requestMock, responseMock, next)
      expect(next).toHaveBeenCalled()
    })
    it('assigns an instance of the loader to response.locals', async () => {
      await instance[0](requestMock, responseMock, next)
      expect(responseMock.locals.assets.loader).toHaveProperty('AssetLoader')
    })
  })

  describe('router', () => {
    it('returns an instance of the router if hostStaticAssets is set to true', async () => {
      instance[0](requestMock, responseMock, next)
      expect(instance[1].name).toEqual('router')
    })
    it('does not return the router if hostStaticAssets is set to false', async () => {
      instanceMiddlewareOnly[0](requestMock, responseMock, next)
      expect(instanceMiddlewareOnly[1]).toBeUndefined()
    })
  })
})
