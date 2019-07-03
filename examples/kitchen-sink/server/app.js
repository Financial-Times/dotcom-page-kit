const express = require('express')
const navigation = require('@financial-times/anvil-middleware-ft-navigation')
const appContext = require('@financial-times/dotcom-middleware-app-context')
const assets = require('@financial-times/dotcom-middleware-assets')

const app = express()

app.use(
  navigation.init(),
  assets.init({ hostStaticAssets: true }),
  appContext.init({ context: { appName: 'kitchen-sink' } })
)

app.get('/', require('./controllers/home'))

module.exports = app
