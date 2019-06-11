import httpMocks from 'node-mocks-http'
import { withEnv } from '@financial-times/anvil-test-utils'
import { AppContextClient } from '@financial-times/anvil-ft-app-context'
import { init } from '..'

export const prodAppContext = {
  appName: 'foo:name',
  appVersion: '123',
  product: 'next',
  abTestState: 'foo:abState',
  edition: 'fooEdition',
  isProduction: true
}

const prodEnvironmentMocks = {
  env: {
    NODE_ENV: 'production',
    SOURCE_VERSION: prodAppContext.appVersion
  },
  requestHeaders: {
    'FT-EDITION': prodAppContext.edition,
    'FT-AB': prodAppContext.abTestState
  },
  responseHeaders: {
    'FT-APP-NAME': prodAppContext.appName
  }
}

const devEnvironmentMocks = mocksWithEnv('development')

function withMocks(mocks, callback) {
  const mocked: any = {
    next: jest.fn(),
    request: httpMocks.createRequest({
      headers: { ...mocks.requestHeaders }
    }),
    response: createHttpResponseWithHeaders(mocks.responseHeaders)
  }

  withEnv(mocks.env, () => {
    callback(mocked)
  })
}

function createHttpResponseWithHeaders(headers) {
  const response = httpMocks.createResponse()
  response.writeHead(200, '', headers)
  return response
}

function mocksWithEnv(env: string) {
  return { ...prodEnvironmentMocks, env: { ...prodEnvironmentMocks.env, NODE_ENV: env } }
}

describe('init()', () => {
  describe('when no options have been supplied', () => {
    it('sets up the app context client on the response', () => {
      withMocks(prodEnvironmentMocks, ({ request, response, next }) => {
        const middleware = init()
        middleware(request, response, next)
        expect(response.locals.appContext).toBeInstanceOf(AppContextClient)
        expect(response.locals.appContext.data).toEqual(prodAppContext)
      })
    })

    it('calls the next function in the chain', () => {
      withMocks(devEnvironmentMocks, ({ request, response, next }) => {
        const middleware = init()
        middleware(request, response, next)
        expect(next).toHaveBeenCalled()
      })
    })

    it('sets the product name to `next` by default', () => {
      withMocks(devEnvironmentMocks, ({ request, response, next }) => {
        const middleware = init()
        middleware(request, response, next)
        expect(response.locals.appContext.data.product).toBe(`next`)
      })
    })

    it('sets `isProduction` to true if `process.env.NODE_ENV` is `production`', () => {
      withMocks(prodEnvironmentMocks, ({ request, response, next }) => {
        const middleware = init()
        middleware(request, response, next)
        expect(response.locals.appContext.data.isProduction).toEqual(true)
      })
    })
  })

  describe('when the `context` option is supplied', () => {
    it('merges in the `context` option value to the app context', () => {
      const context = {
        appVersion: '345',
        foo: '6'
      }
      withMocks(prodEnvironmentMocks, ({ request, response, next }) => {
        const middleware = init({ context })
        middleware(request, response, next)
        expect(response.locals.appContext.data).toEqual({ ...prodAppContext, ...context })
      })
    })
  })
})
