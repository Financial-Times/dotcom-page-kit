import httpMocks from 'node-mocks-http'
import { init } from '..'
import { withEnv } from '../__helpers__/mocking'
import { appContext } from '../__fixtures__/appContext'
import { createHttpResponseWithHeaders } from '../__helpers__/http'

const workingDir = '/some/dir'

const mocks = {
  env: {
    NODE_ENV: 'production',
    SOURCE_VERSION: appContext.version
  },
  requestHeaders: {
    'FT-EDITION': appContext.edition,
    'FT-AB': appContext.abState
  },
  responseHeaders: {
    'FT-APP-NAME': appContext.app
  }
}

describe('init()', () => {
  describe('the returned middleware function', () => {
    it('sets up the app context client on the response', () => {
      withMocks(mocks, ({ request, response, next }) => {
        const middleware = init({ workingDir })
        middleware(request, response, next)
        expect(response.locals.appContext.data).toEqual(appContext)
      })
    })
  })
})

function withMocks(mocks, callback) {
  const mocked = {
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
