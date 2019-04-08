import * as navigation from '..'
import httpMocks from 'node-mocks-http'

const fakeMenuResponse = {
  'navbar-uk': {
    label: 'Navbar UK',
    items: [{ label: 'Foo', url: '/world/uk', submenu: null, selected: false }]
  },
  'navbar-international': {
    label: 'Navbar International',
    items: [{ label: 'Foo', url: '/world/uk', submenu: null, selected: false }]
  },
  'navbar-some-edition-id': {
    label: 'Navbar Fake',
    items: [{ label: 'Foo', url: '/world/uk', submenu: null, selected: false }]
  },
  'drawer-uk': {
    label: 'Drawer UK',
    items: [{ label: 'Foo', url: '/world/uk', submenu: null, selected: false }]
  },
  'drawer-international': {
    label: 'Drawer International',
    items: [{ label: 'Bar', url: '/fake-item?location=/world/uk', submenu: null, selected: false }]
  },
  'drawer-some-edition-id': {
    label: 'Drawer Fake',
    items: [{ label: 'Foo', url: '/world/uk', submenu: null, selected: false }]
  },
  footer: {
    label: 'Footer',
    items: [{ label: 'Support', url: null, submenu: { label: null, items: [] } }]
  }
}

const fakeCrumbtrailResponse = {
  breadcrumb: 'some-breadcrumb',
  subsections: 'some-subsections'
}

const fakeMenu = {
  'navbar-right': undefined,
  'navbar-right-anon': undefined,
  'navbar-simple': undefined,
  currentUrl: '',
  account: undefined,
  anon: undefined,
  user: undefined,
  footer: undefined
}

const fakeMenuData = {
  ...fakeMenu,
  crumbtrail: null,
  navbar: fakeMenuResponse['navbar-some-edition-id'],
  drawer: fakeMenuResponse['drawer-some-edition-id'],
  footer: fakeMenuResponse['footer']
}

const fakeMenuDataDefault = {
  ...fakeMenu,
  crumbtrail: null,
  navbar: fakeMenuResponse['navbar-uk'],
  drawer: fakeMenuResponse['drawer-uk'],
  footer: fakeMenuResponse['footer']
}

const fakeMenuDataWithCrumbtrail = {
  ...fakeMenu,
  crumbtrail: fakeCrumbtrailResponse,
  navbar: fakeMenuResponse['navbar-some-edition-id'],
  drawer: fakeMenuResponse['drawer-some-edition-id'],
  footer: fakeMenuResponse['footer']
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

describe('anvil-middleware-ft-navigation/index', () => {
  let nav
  let navWithCrumbtrail
  let requestMock
  let responseMock
  let responseMockNoEditions
  let next

  beforeEach(() => {
    nav = navigation.init()
    navWithCrumbtrail = navigation.init({ enableCrumbtrail: true })
    requestMock = httpMocks.createRequest()
    responseMock = httpMocks.createResponse({
      locals: { editions: { current: { id: 'some-edition-id' } } }
    })
    responseMockNoEditions = httpMocks.createResponse({
      locals: {}
    })
    next = jest.fn()
  })

  afterEach(() => {
    nav = null
    navWithCrumbtrail = null
    jest.clearAllMocks()
  })

  it('returns a function', () => {
    expect(nav).toBeInstanceOf(Function)
    expect(navWithCrumbtrail).toBeInstanceOf(Function)
  })

  describe('without the enableCrumbtrail option', () => {
    it('sets the navigation properties on response.locals', async () => {
      await nav(requestMock, responseMock, next)
      expect(responseMock.locals.navigation).toEqual(fakeMenuData)
    })
    it('calls the fallthrough function', async () => {
      await nav(requestMock, responseMock, next)
      expect(next).toHaveBeenCalled()
    })
  })

  describe('with the enableCrumbtrail option', () => {
    it('sets the crumbtrail properties on response.locals', async () => {
      await navWithCrumbtrail(requestMock, responseMock, next)
      expect(responseMock.locals.navigation).toEqual(fakeMenuDataWithCrumbtrail)
    })
    it('calls the fallthrough function', async () => {
      await navWithCrumbtrail(requestMock, responseMock, next)
      expect(next).toHaveBeenCalled()
    })
  })

  describe('on error', () => {
    const invalidResponseMock = null
    it('catches the error', async () => {
      await nav(requestMock, invalidResponseMock, next)
      expect(next).toHaveBeenCalledWith(expect.any(Error))
    })
  })

  describe('without editions data', () => {
    it('can handle an empty response.locals', async () => {
      await nav(requestMock, responseMockNoEditions, next)
      expect(responseMockNoEditions.locals.navigation).toEqual(fakeMenuDataDefault)
    })
  })
})
