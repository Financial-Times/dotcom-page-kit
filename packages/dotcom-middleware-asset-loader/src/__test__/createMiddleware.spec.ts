import subject from '../createMiddleware'
import httpMocks from 'node-mocks-http'

let instance
let request
let response
let next

jest.mock('@financial-times/dotcom-server-asset-loader')

describe('dotcom-middleware-asset-loader/src/createMiddleware', () => {
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
    expect(response.locals.assetLoader).toBeDefined()
  })
})
