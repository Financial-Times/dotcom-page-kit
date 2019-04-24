const express = require('express')

const editionMiddleware = require('@financial-times/anvil-middleware-ft-edition')
const navigationMiddleware = require('@financial-times/anvil-middleware-ft-navigation')

const app = express()

app.use(editionMiddleware.init())
app.use(navigationMiddleware.init())

app.use('/dist', express.static('./dist'))
app.get('/', require('./controllers/home'))

module.exports = app
