import httpMocks from 'node-mocks-http'
import { init } from '..'
import { appContext } from '../__fixtures__/appContext'
import { mockAboutDoc } from '../__helpers__/about'
import { createHttpResponseWithHeaders } from '../__helpers__/http'

const workingDir = '/some/dir'

const mocks = {
  env: {
    NODE_ENV: 'production'
  },
  requestHeaders: {
    'FT-EDITION': appContext.edition,
    'FT-AB': appContext.abState
  },
  responseHeaders: {
    'FT-APP-NAME': appContext.app
  },
  workingDir
}

describe('init()', () => {
  describe('the returned middleware function', () => {
    it('sets up the app context client on the response', () => {
      withMocks(({ request, response, next }) => {
        const middleware = init({ workingDir })
        middleware(request, response, next)
        expect(response.locals.appContext.data).toEqual(appContext)
      })
    })
  })
})

function withMocks(callback, _mocks = mocks) {
  const originalEnv = process.env
  const mocks = {
    next: jest.fn(),
    request: httpMocks.createRequest({
      headers: { ..._mocks.requestHeaders }
    }),
    response: createHttpResponseWithHeaders(_mocks.responseHeaders)
  }

  mockAboutDoc({ workingDir: _mocks.workingDir, version: appContext.version })

  process.env = _mocks.env

  callback(mocks)

  process.env = originalEnv
}
