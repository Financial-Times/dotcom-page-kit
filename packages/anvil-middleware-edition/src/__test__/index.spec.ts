import subject from '../index'
import httpMocks from 'node-mocks-http'

const editionsUk = {
  current: { id: 'uk', name: 'UK', url: '/' },
  others: [{ id: 'international', name: 'International', url: '/' }]
}

const editionsInternational = {
  current: { id: 'international', name: 'International', url: '/' },
  others: [{ id: 'uk', name: 'UK', url: '/' }]
}

describe('anvil-middleware-edition', () => {
  let instance

  beforeEach(() => {
    instance = subject()
  })

  afterEach(() => {
    instance = null
  })

  describe('middleware', () => {
    let next
    let requestMock
    let responseMock

    beforeEach(() => {
      responseMock = httpMocks.createResponse()
      requestMock = httpMocks.createRequest()
      next = jest.fn()
    })

    it('returns a function', () => {
      instance(requestMock, responseMock, next)
      expect(instance).toBeInstanceOf(Function)
    }),
      it('calls the fallthrough function', () => {
        instance(requestMock, responseMock, next)
        expect(next).toHaveBeenCalled()
      }),
      it('sets the edition to uk as a default', () => {
        instance(requestMock, responseMock, next)
        expect(responseMock.locals.editions).toEqual(expect.objectContaining(editionsUk))
      }),
      it('sets the edition to international if passed a valid query string', () => {
        requestMock.query.edition = 'international'
        instance(requestMock, responseMock, next)
        expect(responseMock.locals.editions).toEqual(expect.objectContaining(editionsInternational))
      }),
      it('sets a cookie', () => {
        requestMock.query.edition = 'international'
        instance(requestMock, responseMock, next)
        expect(responseMock.cookie().cookies).toHaveProperty('next-edition')
      })
  })
})
