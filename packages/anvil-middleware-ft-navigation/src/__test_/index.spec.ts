import { init as subject } from '..'
import httpMocks from 'node-mocks-http'

const fakeMenuResponse = {
  'drawer-uk': {
    label: 'Drawer UK',
    items: [{ label: 'Foo', url: '/world/uk', submenu: null, selected: false }]
  },
  'drawer-international': {
    label: 'Drawer International',
    items: [{ label: 'Bar', url: '/fake-item?location=/world/uk', submenu: null, selected: false }]
  }
}

const fakeCrumbtrailResponse = {
  breadcrumb: 'some-breadcrumb',
  subsections: 'some-subsections'
}

const fakeMenuData = {
  crumbtrail: null,
  ...fakeMenuResponse
}
const fakeCrumbtrailData = {
  crumbtrail: fakeCrumbtrailResponse,
  ...fakeMenuResponse
}

const FakePoller = {
  start: jest.fn(),
  getMenuData: jest.fn().mockImplementation(() => fakeMenuResponse),
  getCrumbtrail: jest.fn().mockImplementation(() => fakeCrumbtrailResponse)
}

jest.mock(
  '@financial-times/anvil-server-ft-navigation',
  () => {
    return {
      Navigation: jest.fn().mockImplementation(() => FakePoller)
    }
  },
  { virtual: true }
)

describe('anvil-middleware-ft-navigation', () => {
  let instance
  let instanceWithCrumbtrail
  let requestMock
  let responseMock
  let next

  beforeEach(() => {
    instance = subject()
    instanceWithCrumbtrail = subject({ enableCrumbtrail: true })
    requestMock = httpMocks.createRequest()
    responseMock = httpMocks.createResponse()
    next = jest.fn()
  })

  afterEach(() => {
    instance = null
    instanceWithCrumbtrail = null
    jest.clearAllMocks()
  })

  it('returns a function', () => {
    expect(instance).toBeInstanceOf(Function)
    expect(instanceWithCrumbtrail).toBeInstanceOf(Function)
  })

  describe('without the enableCrumbtrail option', () => {
    it('sets the navigation properties on response.locals', async () => {
      await instance(requestMock, responseMock, next)
      expect(responseMock.locals.navigation).toEqual(fakeMenuData)
    })
    it('calls the fallthrough function', async () => {
      await instance(requestMock, responseMock, next)
      expect(next).toHaveBeenCalled()
    })
  })

  describe('with the enableCrumbtrail option', () => {
    it('sets the crumbtrail properties on response.locals', async () => {
      await instanceWithCrumbtrail(requestMock, responseMock, next)
      expect(responseMock.locals.navigation).toEqual(fakeCrumbtrailData)
    })
    it('calls the fallthrough function', async () => {
      await instanceWithCrumbtrail(requestMock, responseMock, next)
      expect(next).toHaveBeenCalled()
    })
  })

  describe('on error', () => {
    const invalidResponseMock = null
    it('catches the error', async () => {
      await instance(requestMock, invalidResponseMock, next)
      expect(next).toHaveBeenCalledWith(expect.any(Error))
    })
  })
})
