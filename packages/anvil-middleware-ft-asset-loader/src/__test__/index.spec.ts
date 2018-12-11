import subject from '../index'
import httpMocks from 'node-mocks-http'

let instance
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
  instance = subject()
  requestMock = httpMocks.createRequest()
  responseMock = httpMocks.createResponse({})
  next = jest.fn()
})

afterEach(() => {
  instance = null
  jest.clearAllMocks()
})

describe('anvil-server-ft-asset-loader', () => {
  xit('returns an Array of functions', () => {
    expect(instance).toBeInstanceOf(Array)
    expect(instance[0]).toBeInstanceOf(Function)
    expect(instance[1]).toBeInstanceOf(Function)
  })

  describe('middleware', () => {
    xit('calls the fallthrough function', async () => {
      await instance[0](requestMock, responseMock, next)
      expect(next).toHaveBeenCalled()
    })
    it('assigns an instance of the loader to response.locals', async () => {
      await instance[0](requestMock, responseMock, next)
      expect(responseMock.locals.assets.loader).toHaveProperty('AssetLoader')
    })
  })

  describe('router', () => {
    // TODO
  })
})

describe('on error', () => {
  const invalidResponseMock = null
  xit('catches the error', async () => {
    await instance[0](requestMock, invalidResponseMock, next)
    expect(next).toHaveBeenCalledWith(expect.any(Error))
  })
})
