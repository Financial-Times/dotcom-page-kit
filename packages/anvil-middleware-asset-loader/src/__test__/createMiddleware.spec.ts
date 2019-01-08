import subject from '../createMiddleware'
import httpMocks from 'node-mocks-http'

let instance
let request
let response
let next

jest.mock('../ExtendedAssetLoader')

describe('anvil-middleware-asset-loader/src/createMiddleware', () => {
  beforeEach(() => {
    instance = subject({})
    request = httpMocks.createRequest()
    response = httpMocks.createResponse()
    next = jest.fn()
  })

  afterEach(() => {
    instance = null
    request = null
    response = null
    next = null
  })

  it('calls the fallthrough function', () => {
    instance(request, response, next)
    expect(next).toHaveBeenCalled()
  })

  it('assigns an instance of the asset loader to response.locals', () => {
    instance(request, response, next)
    expect(response.locals.assets).toBeDefined()
  })

  it('intercepts the default response.send() method to append link headers', () => {
    instance(request, response, next)

    response.send('Hello World')

    expect(response._headers).toHaveProperty('link')
    expect(response._isEndCalled()).toEqual(true)
  })
})
