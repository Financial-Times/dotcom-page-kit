import request from 'supertest'
import { app } from '../server/app'

describe('examples/express-with-jsx', () => {
  let response

  beforeEach(async () => {
    response = await request(app).get('/')
  })

  it('returns an OK response', () => {
    expect(response.statusCode).toBe(200)
  })

  it('renders a view component', () => {
    expect(response.text).toContain('<h1 class="Page-title">')
  })

  it('renders view sub-components', () => {
    expect(response.text).toContain('<dl class="CatList">')
  })

  it('renders the view into a layout', () => {
    expect(response.text).toContain('<html lang="en">')
  })
})
