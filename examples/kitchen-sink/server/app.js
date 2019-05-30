const express = require('express')
const navigation = require('@financial-times/anvil-middleware-ft-navigation')
const assets = require('@financial-times/anvil-middleware-assets')

const app = express()

app.use(navigation.init(), assets.init({ hostStaticAssets: true }))

app.get('/', require('./controllers/home'))

module.exports = app
