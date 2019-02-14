const request = require('supertest')
const app = require('../server/app')

describe('examples/express-with-handlebars', () => {
  it('renders the page', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  })
})
