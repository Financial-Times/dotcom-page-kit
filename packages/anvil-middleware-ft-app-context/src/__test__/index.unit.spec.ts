import httpMocks from 'node-mocks-http'
import { init } from '..'
import { AnyObject } from '@financial-times/anvil-types-generic'
import { AppContext } from '@financial-times/anvil-ft-app-context'
import { appContext } from '../__fixtures__/appContext'
import { getAbState, getEdition, getAppName, isProduction, getAppVersion } from '../helpers'
import * as helpers from '../helpers'

jest.mock('../helpers', () => ({
  getAbState: jest.fn(),
  getEdition: jest.fn(),
  getAppName: jest.fn(),
  getAppVersion: jest.fn(),
  isProduction: jest.fn()
}))

function setupMocks(context = appContext) {
  ;(getAbState as any).mockReturnValue(context.abState)
  ;(getEdition as any).mockReturnValue(context.edition)
  ;(getAppName as any).mockReturnValue(context.app)
  ;(isProduction as any).mockReturnValue(context.isProduction)
  ;(getAppVersion as any).mockReturnValue(context.version)

  return {
    next: jest.fn(),
    request: httpMocks.createRequest(),
    response: httpMocks.createResponse()
  }
}

describe('init()', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('the returned middleware function', () => {
    it('sets up the app context client on the response', () => {
      const middleware = init()
      const { request, response, next } = setupMocks()
      middleware(request, response, next)
      expect(response.locals.appContext).toBeInstanceOf(AppContext)
      expect(response.locals.appContext.data).toEqual(appContext)
      expectAllHelpersToReceive({ request, response, workingDir: process.cwd() })
    })

    it('calls the next function in the chain', () => {
      const middleware = init()
      const { request, response, next } = setupMocks()
      middleware(request, response, next)
      expect(next).toHaveBeenCalled()
    })

    it('defaults to the supplied context', () => {
      const context = {
        app: '1',
        product: '2',
        version: '3',
        abState: '4',
        edition: '5',
        isProduction: false,
        foo: '6'
      }
      const middleware = init({ context })
      const { request, response, next } = setupMocks()
      middleware(request, response, next)
      expect(response.locals.appContext.data).toEqual(context)
    })

    it('respects the supplied working directory', () => {
      const workingDir = './foo/bar'
      const middleware = init({ workingDir })
      const { request, response, next } = setupMocks()
      middleware(request, response, next)
      expectAllHelpersToReceive({ workingDir })
    })

    it('respects the supplied environment', () => {
      const env = 'development'
      const middleware = init({ env })
      const { request, response, next } = setupMocks()
      middleware(request, response, next)
      expectAllHelpersToReceive({ env })
    })

    it('respects the supplied product name', () => {
      const product = 'foobar'
      const middleware = init({ product })
      const { request, response, next } = setupMocks()
      middleware(request, response, next)
      expect(response.locals.appContext.data.product).toBe(product)
    })
  })
})

function argsOf(mockFn) {
  return mockFn.mock.calls[0][0]
}

function expectAllHelpersToReceive(props: AnyObject) {
  for (let key of Object.keys(helpers)) {
    if (key !== 'default') {
      const helper = helpers[key]
      for (let prop of Object.keys(props)) {
        expect(argsOf(helper)[prop]).toEqual(props[prop])
      }
    }
  }
}
