if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
require('sucrase/register')

const port = process.env.PORT || 3000
const app = require('./app').app

app.listen(port, () => console.log(`Example app running at http://localhost:${port}!`)) // eslint-disable-line no-console
