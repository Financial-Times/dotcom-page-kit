const request = require('supertest')
const app = require('../server/app')

describe('examples/express-with-handlebars', () => {
  let response

  beforeEach(async () => {
    response = await request(app).get('/')
  })

  it('returns an OK response', () => {
    expect(response.statusCode).toBe(200)
  })

  it('renders a view', () => {
    expect(response.text).toContain('<h1 class="Page-title">')
  })

  it('renders view partials', () => {
    expect(response.text).toContain('<dl class="DogList">')
  })

  it('renders the view into a layout', () => {
    expect(response.text).toContain('<html lang="en">')
  })

  it('renders layout partials ', () => {
    expect(response.text).toContain('<div class="Header">')
  })

  // TODO: re-add when helpers are implemented
  // it('supports template inheritance', () => {
  //   expect(response.text).toContain('<meta name="description"')
  // })
})
