if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
require('sucrase/register')

const port = process.env.PORT
const app = require('./app').app

app.listen(port, () => console.log(`Example app listening on port ${port}!`)) // eslint-disable-line no-console
