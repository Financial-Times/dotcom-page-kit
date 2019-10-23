const express = require('express')
const { PageKitHandlebars } = require('@financial-times/dotcom-server-handlebars')
const homePageController = require('./controllers/home')

const app = (module.exports = express())

app.locals.siteName = 'Good Dogs'

// Add Handlebars as a view engine so controllers may use response.render()
const renderer = new PageKitHandlebars({
  cache: process.env.NODE_ENV === 'production'
})

app.engine('.hbs', renderer.engine)

app.use('/public', express.static('./public'))

app.get('/', homePageController)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`) // eslint-disable-line no-console
})
