const app = require('../server/app')
const request = require('supertest')

describe('examples/kitchen-sink/integration', () => {
  let response

  beforeEach(async () => {
    response = await request(app)
      .get('/')
      // NOTE: FT.com apps expect many headers to be set by the CDN+preflight and/or the router.
      .set({
        'ft-edition': 'international'
      })
  })

  it('returns an OK response', () => {
    expect(response.statusCode).toBe(200)
  })

  it('renders the Financial Times Header Logo as a link', () => {
    expect(response.text).toContain('data-trackable="logo" href="/"')
  })

  it('renders the header top components; search and menu', () => {
    expect(response.text).toContain('data-trackable="search-toggle">')
    expect(response.text).toContain('data-trackable="drawer-toggle"')
  })

  it('populates navigation elements with navigation data', () => {
    expect(response.text).toContain('data-trackable="Home"')
    expect(response.text).toContain('data-trackable="World"')
    expect(response.text).toContain('data-trackable="Markets"')
  })

  it('populates drawer elements with navigation data', () => {
    expect(response.text).toContain('o-header__drawer-menu--primary')
    expect(response.text).toContain('o-header__drawer-menu--user')
  })

  it('populates meganav elements with navigation data', () => {
    expect(response.text).toContain('data-trackable="meganav | World"')
    expect(response.text).toContain('data-trackable="meganav | Markets"')
    expect(response.text).toContain('data-trackable="meganav | Opinion"')
    expect(response.text).toContain('o-header__mega-heading')
    expect(response.text).toContain('o-header__mega-content')
    expect(response.text).toContain('o-header__mega-item')
  })

  it('renders edition with current edition selected', () => {
    expect(response.text).toContain('<span class="o-header__drawer-menu-item o-header__drawer-current-edition">International</span>')
  })

  it('renders app context data as embedded JSON', () => {
    expect(response.text).toContain('<script type="application/json" id="page-kit-app-context">')
  })

  it('renders data embed data as embedded JSON', () => {
    expect(response.text).toContain('<script type="application/json" id="data-embed">')
  })
})
