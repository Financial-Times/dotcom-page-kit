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
  })

  describe('with a header set', () => {
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

    it('returns the set edition', () => {
      expect(result).toEqual('international')
    })

    it('sets a next-edition cookie', () => {
      subject(request, response)
      expect(response.cookies).toHaveProperty('next-edition')
    })
  })
})
