const express = require('express')

const navigationMiddleware = require('@financial-times/anvil-middleware-ft-navigation')

const app = express()

app.use(navigationMiddleware.init())

app.use('/dist', express.static('./dist'))
app.get('/', require('./controllers/home'))

module.exports = app
