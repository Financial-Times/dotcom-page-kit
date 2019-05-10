import * as navigation from '..'
import httpMocks from 'node-mocks-http'
import * as navEditions from '../navigation-editions'

// Hack so typescript accepts that navigationEditions has mock methods
const navigationEditions = <jest.Mock<object>>navEditions.navigationEditions

const fakeMenuResponse = {
  'navbar-uk': {
    label: 'Navbar UK',
    items: [{ label: 'Foo', url: '/world/uk', submenu: null, selected: false }]
  },
  'navbar-international': {
    label: 'Navbar International',
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
  footer: {
    label: 'Footer',
    items: [{ label: 'Support', url: null, submenu: { label: null, items: [] } }]
  },
  'editions-uk': {
    current: { id: 'uk', name: 'UK', url: '/' },
    others: { id: 'international', name: 'International', url: '/' }
  },
  'editions-international': {
    current: { id: 'international', name: 'International', url: '/' },
    others: { id: 'uk', name: 'UK', url: '/' }
  }
}

const fakeSubNavigationResponse = {
  breadcrumb: 'some-breadcrumb',
  subsections: 'some-subsections'
}

const fakeMenu = {
  'navbar-right': undefined,
  'navbar-right-anon': undefined,
  'navbar-simple': undefined,
  currentPath: '',
  account: undefined,
  anon: undefined,
  user: undefined,
  footer: undefined,
  editions: undefined
}

const fakeMenuData = {
  ...fakeMenu,
  subNavigation: null,
  navbar: fakeMenuResponse['navbar-uk'],
  drawer: fakeMenuResponse['drawer-uk'],
  footer: fakeMenuResponse['footer'],
  editions: fakeMenuResponse['editions-uk']
}

const fakeMenuDataInternational = {
  ...fakeMenu,
  subNavigation: null,
  navbar: fakeMenuResponse['navbar-international'],
  drawer: fakeMenuResponse['drawer-international'],
  footer: fakeMenuResponse['footer'],
  editions: fakeMenuResponse['editions-international']
}

const fakeMenuDataWithSubNavigation = {
  ...fakeMenu,
  subNavigation: fakeSubNavigationResponse,
  navbar: fakeMenuResponse['navbar-uk'],
  drawer: fakeMenuResponse['drawer-uk'],
  footer: fakeMenuResponse['footer'],
  editions: fakeMenuResponse['editions-uk']
}

const FakePoller = {
  start: jest.fn(),
  getMenuData: jest.fn().mockImplementation(() => fakeMenuResponse),
  getSubNavigation: jest.fn().mockImplementation(() => fakeSubNavigationResponse)
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

jest.mock('../navigation-editions', () => {
  return {
    navigationEditions: jest.fn().mockImplementation(() => fakeMenuResponse['editions-uk'])
  }
})

describe('anvil-middleware-ft-navigation/index', () => {
  let nav
  let navWithSubNavigation
  let requestMock
  let responseMock
  let next

  beforeEach(() => {
    nav = navigation.init()
    navWithSubNavigation = navigation.init({ enableSubNavigation: true })
    requestMock = httpMocks.createRequest()
    responseMock = httpMocks.createResponse({
      locals: {}
    })
    next = jest.fn()
  })

  afterEach(() => {
    nav = null
    navWithSubNavigation = null
    jest.clearAllMocks()
  })

  it('returns a function', () => {
    expect(nav).toBeInstanceOf(Function)
    expect(navWithSubNavigation).toBeInstanceOf(Function)
  })

  it('sets the navigation properties on response.locals', async () => {
    await nav(requestMock, responseMock, next)
    expect(responseMock.locals.navigation).toEqual(fakeMenuData)
  })

  it('calls the fallthrough function', async () => {
    await nav(requestMock, responseMock, next)
    expect(next).toHaveBeenCalled()
  })

  describe('when enableSubNavigation is true', () => {
    it('sets the subNavigation properties on response.locals', async () => {
      await navWithSubNavigation(requestMock, responseMock, next)
      expect(responseMock.locals.navigation).toEqual(fakeMenuDataWithSubNavigation)
    })
    it('calls the fallthrough function', async () => {
      await navWithSubNavigation(requestMock, responseMock, next)
      expect(next).toHaveBeenCalled()
    })
  })

  describe('when the response object is invalid', () => {
    const invalidResponseMock = null
    it('catches the error', async () => {
      await nav(requestMock, invalidResponseMock, next)
      expect(next).toHaveBeenCalledWith(expect.any(Error))
    })
  })

  describe('when current edition is international', () => {
    it('returns the international edition', async () => {
      navigationEditions.mockReturnValue(fakeMenuResponse['editions-international'])
      await nav(requestMock, responseMock, next)
      expect(responseMock.locals.navigation).toEqual(fakeMenuDataInternational)
    })
  })
})
