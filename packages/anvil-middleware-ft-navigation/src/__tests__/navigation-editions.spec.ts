import { navigationEditions as subject } from '../navigation-editions'
import httpMocks from 'node-mocks-http'

const editionsUK = {
  current: expect.objectContaining({ id: 'uk' }),
  others: [expect.objectContaining({ id: 'international' })]
}

const editionsInternational = {
  current: expect.objectContaining({ id: 'international' }),
  others: [expect.objectContaining({ id: 'uk' })]
}

let instance
let requestMock
let requestMockWithQueryString
let responseMock

describe('anvil-middleware-ft-navigation/src/navigation-editions', () => {
  beforeEach(() => {
    responseMock = httpMocks.createResponse()
    requestMock = httpMocks.createRequest()
    requestMockWithQueryString = httpMocks.createRequest({ query: { edition: 'international' } })
    instance = subject(requestMock, responseMock)
  })

  afterEach(() => {
    instance = null
  })

  describe('with no query string parameter or cookie set', () => {
    it('returns UK edition by default', () => {
      expect(instance).toEqual(editionsUK)
    })
  })

  describe('with header set', () => {
    let request
    let response
    let result

    beforeEach(() => {
      request = httpMocks.createRequest({ headers: { 'ft-edition': 'international' } })
      response = httpMocks.createResponse()
      result = subject(request, response)
    })

    it('returns the set edition', () => {
      expect(result).toEqual(editionsInternational)
    })
  })

  describe('with a query string parameter set', () => {
    let request
    let response
    let result

    beforeEach(() => {
      request = httpMocks.createRequest({ query: { edition: 'international' } })
      response = httpMocks.createResponse()
      result = subject(request, response)
    })

    it('returns the set edition', () => {
      expect(result).toEqual(editionsInternational)
    })

    it('sets a next-edition cookie', () => {
      instance = subject(requestMockWithQueryString, responseMock)
      expect(response.cookies).toHaveProperty('next-edition')
    })
  })
})
