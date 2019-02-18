const express = require('express')
const { engine } = require('@financial-times/anvil-server-ft-handlebars')

const app = express()

app.locals.siteName = 'Good Dogs'

// Enable view caching to avoid looking up partials for each render. The partials
// lookup can be very slow due to an overly generic glob pattern.
app.enable('view cache')

// Add Handlebars as a view engine so controllers may use response.render()
app.engine('.hbs', engine({ extname: '.hbs' }))

app.get('/', require('./controllers/home'))

module.exports = app
