const express = require('express')

const app = express()
const port = 3456

app.locals.siteTitle = 'Example App'

app.set('views', null)

app.use(require('./middleware/anvil'))

app.get('/', require('./controllers/home'))

app.listen(port, () => {
  console.log(`Listening on PORT:${port}`) // eslint-disable-line no-console
})
