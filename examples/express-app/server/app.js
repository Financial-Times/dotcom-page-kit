const express = require('express')

const app = express()
const port = 3456

require('./setup')(app)

app.locals.siteTitle = 'Example App'

app.use(require('./middleware/anvil'))

app.get('/', require('./controllers/home'))

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening on PORT:${port}`)
})
