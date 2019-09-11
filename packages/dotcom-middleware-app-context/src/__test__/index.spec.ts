jest.mock('@financial-times/dotcom-server-app-context')

import httpMocks from 'node-mocks-http'
import { AppContext } from '@financial-times/dotcom-server-app-context'
import { init } from '../index'

const appContext = {
  appName: 'my-app-name',
  appVersion: '123'
}

const headers = {
  'ft-edition': 'international',
  'ft-ab': '-'
}

describe('dotcom-middleware-app-context', () => {
  let instance
  let request
  let response
  let next

  beforeEach(() => {
    request = httpMocks.createRequest({ headers })
    response = httpMocks.createResponse({ locals: {} })
    next = jest.fn()
    instance = init({ appContext })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('returns a request handler function', () => {
    expect(instance).toBeInstanceOf(Function)
    expect(instance).toHaveLength(3)
  })

  describe('when handling a request', () => {
    it('initialises app context with inferred data', () => {
      const expected = {
        appContext: expect.objectContaining({ edition: 'international' })
      }

      instance(request, response, next)

      expect(AppContext).toHaveBeenCalledWith(expected)
    })

    it('ignores default "-" header values', () => {
      const expected = {
        appContext: expect.not.objectContaining({ abTestState: '-' })
      }

      instance(request, response, next)

      expect(AppContext).toHaveBeenCalledWith(expected)
    })

    it('initialises app context with provided app context overrides', () => {
      const expected = { appContext: expect.objectContaining(appContext) }

      instance(request, response, next)

      expect(AppContext).toHaveBeenCalledWith(expected)
    })

    it('appends the app context instance to response.locals', () => {
      instance(request, response, next)
      expect(response.locals.appContext).toBeInstanceOf(AppContext)
    })

    it('calls the fallthrough function', () => {
      instance(request, response, next)
      expect(next).toHaveBeenCalled()
    })
  })

  describe('when the app context data is invalid', () => {
    beforeEach(() => {
      // NOTE: AppContext has been mocked but we must first
      // tell TS it's a mock before we can use it like one.
      const AppContextMock = AppContext as jest.Mock

      AppContextMock.mockImplementation(() => {
        throw Error('INVALID')
      })
    })

    it('calls the fallthrough function with the error', () => {
      instance(request, response, next)

      expect(next).toHaveBeenCalledWith(expect.any(Error))
    })
  })
})
