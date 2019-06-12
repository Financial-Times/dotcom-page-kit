import httpMocks from 'node-mocks-http'
import { AppContextClient } from '@financial-times/anvil-ft-app-context'
import { init } from '../index'

const context = {
  appName: 'my-app-name',
  appVersion: '123'
}

const headers = {
  'ft-edition': 'international',
  'ft-ab': 'foo:true,bar:false'
}

jest.mock('@financial-times/anvil-ft-app-context')

describe('anvil-middleware-ft-app-context', () => {
  let instance
  let request
  let response
  let next

  beforeEach(() => {
    request = httpMocks.createRequest({ headers })
    response = httpMocks.createResponse({ locals: {} })
    next = jest.fn()
    instance = init({ context })
  })

  it('returns a request handler function', () => {
    expect(instance).toBeInstanceOf(Function)
    expect(instance).toHaveLength(3)
  })

  describe('when handling a request', () => {
    it('initialises app context with inferred data', () => {
      const expected = {
        context: expect.objectContaining({ edition: 'international', abTestState: 'foo:true,bar:false' })
      }

      instance(request, response, next)

      expect(AppContextClient).toHaveBeenCalledWith(expected)
    })

    it('initialises app context with provided context overrides', () => {
      const expected = { context: expect.objectContaining(context) }

      instance(request, response, next)

      expect(AppContextClient).toHaveBeenCalledWith(expected)
    })

    it('appends the app context instance to response.locals', () => {
      instance(request, response, next)
      expect(response.locals.appContext).toBeInstanceOf(AppContextClient)
    })

    it('calls the fallthrough function', () => {
      instance(request, response, next)
      expect(next).toHaveBeenCalled()
    })
  })
})
