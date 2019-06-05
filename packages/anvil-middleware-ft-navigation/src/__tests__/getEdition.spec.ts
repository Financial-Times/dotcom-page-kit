import subject from '../getEdition'
import httpMocks from 'node-mocks-http'

describe('anvil-middleware-ft-navigation/src/getEdition', () => {
  describe('with no query string parameter or cookie set', () => {
    let request
    let response
    let result

    beforeAll(() => {
      request = httpMocks.createRequest()
      response = httpMocks.createResponse()
      result = subject(request, response)
    })

    it('returns the default edition', () => {
      expect(result).toEqual('uk')
    })

    it('sets a vary header with the default edition', () => {
      expect(response.getHeader('vary')).toBe('uk')
    })
  })

  describe('with an edition header set', () => {
    let request
    let response
    let result

    beforeAll(() => {
      request = httpMocks.createRequest({ headers: { 'ft-edition': 'international' } })
      response = httpMocks.createResponse()
      result = subject(request, response)
    })

    it('returns the set edition', () => {
      expect(result).toEqual('international')
    })

    it('sets a vary header with the set edition', () => {
      expect(response.getHeader('vary')).toBe('international')
    })
  })

  describe('with a query string parameter set', () => {
    let request
    let response
    let result

    beforeAll(() => {
      request = httpMocks.createRequest({ query: { edition: 'international' } })
      response = httpMocks.createResponse()
      result = subject(request, response)
    })

    it('returns the selected edition', () => {
      expect(result).toEqual('international')
    })

    it('sets a next-edition cookie with the selected edition', () => {
      expect(response.cookies['next-edition'].value).toBe('international')
    })

    it('sets a vary header with the selected edition', () => {
      expect(response.getHeader('vary')).toBe('international')
    })
  })
})
