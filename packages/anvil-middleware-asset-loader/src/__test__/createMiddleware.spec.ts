import subject from '../createMiddleware'
import httpMocks from 'node-mocks-http'

let instance
let request
let response
let next

jest.mock('@financial-times/anvil-server-asset-loader')

describe('anvil-middleware-asset-loader/src/createMiddleware', () => {
  beforeEach(() => {
    instance = subject({})
    request = httpMocks.createRequest({ app: { locals: {} } })
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

  it('adds an instance of the asset loader to response.locals', () => {
    instance(request, response, next)
    expect(response.locals.assets.loader).toBeDefined()
  })

  it('adds an instance of resource hints to response.locals', () => {
    instance(request, response, next)
    expect(response.locals.assets.resourceHints).toBeDefined()
  })

  it('intercepts the default response.send() method to append link headers', () => {
    instance(request, response, next)

    response.send('Hello World')

    expect(response._headers).toHaveProperty('link')
    expect(response._isEndCalled()).toEqual(true)
  })

  it('only adds link headers for HTML responses', () => {
    instance(request, response, next)

    response.type('txt')
    response.send('Hello World')

    expect(response._headers).not.toHaveProperty('link')
    expect(response._isEndCalled()).toEqual(true)
  })

  it('does not add link headers for HEAD requests', () => {
    const request = httpMocks.createRequest({ method: 'HEAD' })

    instance(request, response, next)

    response.send('Hello World')

    expect(response._headers).not.toHaveProperty('link')
    expect(response._isEndCalled()).toEqual(true)
  })
})
