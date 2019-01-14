const express = require('express')
const { engine } = require('@financial-times/anvil-server-ft-handlebars')

const app = express()
const port = 3456

app.locals.siteTitle = 'Example App'

// Enable vuew caching to avoid looking up partials for each render. The partials
// lookup can be very slow due to an overly generic glob pattern.
app.enable('view cache')

// Add Handlebars as a view engine so controllers may use response.render()
app.engine('.hbs', engine({ extname: '.hbs' }))

app.use(require('./middleware/anvil'))

app.get('/', require('./controllers/home'))

app.listen(port, () => {
  console.log(`Listening on PORT:${port}`) // eslint-disable-line no-console
})
