import { navigationEditions as subject } from '../navigation-editions'
import httpMocks from 'node-mocks-http'

const editionsUk = {
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

beforeEach(() => {
  responseMock = httpMocks.createResponse()
  requestMock = httpMocks.createRequest()
  requestMockWithQueryString = httpMocks.createRequest({ query: { edition: 'international' } })
  instance = subject(requestMock, responseMock)
})

afterEach(() => {
  instance = null
})

it('returns uk as the current edition by default', () => {
  expect(instance).toEqual(editionsUk)
})

describe('when international is passed as a query string parameter', () => {
  it('returns international edition', () => {
    instance = subject(requestMockWithQueryString, responseMock)
    expect(instance).toEqual(editionsInternational)
  })

  it('sets a next-edition cookie', () => {
    instance = subject(requestMockWithQueryString, responseMock)
    expect(responseMock.cookies).toHaveProperty('next-edition')
  })
})
