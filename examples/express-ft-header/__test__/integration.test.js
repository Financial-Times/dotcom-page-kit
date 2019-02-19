const request = require('supertest')
const app = require('../server/app')

describe('examples/express-ft-header', () => {
  let response

  beforeEach(async () => {
    response = await request(app).get('/')
  })

  it('returns an OK response', () => {
    expect(response.statusCode).toBe(200)
  })

  it('renders the Financial Times Header Logo as a link', () => {
    expect(response.text).toContain('data-trackable="logo" href="/"')
  })

  it('renders the header top components; search, menu and myFT', () => {
    expect(response.text).toContain('data-trackable="search-toggle">')
    expect(response.text).toContain('data-trackable="drawer-toggle"')
    expect(response.text).toContain('href="/myft" data-trackable="my-ft"')
  })

  it('populates navigation elements with navigation data', () => {
    expect(response.text).toContain('data-trackable="Home"')
    expect(response.text).toContain('data-trackable="World"')
    expect(response.text).toContain('data-trackable="Markets"')
  })

})
