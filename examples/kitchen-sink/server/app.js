const express = require('express')
const navigation = require('@financial-times/dotcom-middleware-navigation')
const appContext = require('@financial-times/dotcom-middleware-app-context')
const assets = require('@financial-times/dotcom-middleware-asset-loader')

const app = express()

app.use(
  navigation.init(),
  assets.init({ hostStaticAssets: true }),
  appContext.init({
    appContext: {
      appName: 'Kitchen Sink'
    }
  })
)

// Embed custom data into every view
app.use((request, response, next) => {
  response.locals.embeddedData = { foo: true, bar: 'qux' }
  next()
})

app.get('/', require('./controllers/home'))

module.exports = app
