import { init as subject } from '../index'
import httpMocks from 'node-mocks-http'

describe('anvil-middleware-ft-ab-test', () => {
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
      expect(instance).toBeInstanceOf(Function)
    })
    it('calls the fallthrough function', () => {
      instance(requestMock, responseMock, next)
      expect(next).toHaveBeenCalled()
    })
  })
})
