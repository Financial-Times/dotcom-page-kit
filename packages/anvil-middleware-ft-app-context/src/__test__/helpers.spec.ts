import httpMocks from 'node-mocks-http'
import { appContext } from '../__fixtures__/appContext'
import { createHttpResponseWithHeaders } from '../__helpers__/http'
import { getAppName, getAbState, getEdition, isProduction, getAppVersion } from '../helpers'
import { withEnv } from '../__helpers__/mocking'

describe('helpers', () => {
  describe('getAppName()', () => {
    it('returns the app name from the response', () => {
      const response = createHttpResponseWithHeaders({ 'FT-APP-NAME': appContext.app })
      const result = getAppName({ response })
      expect(result).toBe(appContext.app)
    })
  })

  describe('getAbState', () => {
    it('returns the ab state from the request', () => {
      const request = httpMocks.createRequest({ headers: { 'FT-AB': appContext.abState } })
      const result = getAbState({ request })
      expect(result).toBe(appContext.abState)
    })
  })

  describe('getEdition', () => {
    it('returns the edition', () => {
      const request = httpMocks.createRequest({ headers: { 'FT-EDITION': appContext.edition } })
      const result = getEdition({ request })
      expect(result).toBe(appContext.edition)
    })
  })

  describe('getAppVersion', () => {
    it('returns the `SOURCE_VERSION` environment variable', () => {
      const env = { SOURCE_VERSION: 'foo:bar' }
      withEnv(env, () => {
        const result = getAppVersion({})
        expect(result).toBe(env.SOURCE_VERSION)
      })
    })
  })

  describe('isProduction', () => {
    it('returns `true` when in the production environment', () => {
      const environment = 'production'
      const result = isProduction({ environment })
      expect(result).toBe(true)
    })

    it('returns `false` when not in the production environment', () => {
      const environment = 'development'
      const result = isProduction({ environment })
      expect(result).toBe(false)
    })

    it('is case insensitive', () => {
      const environment = 'pRoduCtion'
      const result = isProduction({ environment })
      expect(result).toBe(true)
    })
  })
})
