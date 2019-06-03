const express = require('express')
const hbs = require('./lib/handlebars')

const app = express()

app.locals.siteName = 'Good Dogs'

// Add Handlebars as a view engine so controllers may use response.render()
app.engine('.hbs', hbs.engine)

app.use('/public', express.static('./public'))

app.get('/', require('./controllers/home'))

module.exports = app
