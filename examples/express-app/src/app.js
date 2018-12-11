const editionMiddleware = require('@financial-times/anvil-middleware-ft-edition')
const navigationMiddleware = require('@financial-times/anvil-middleware-ft-navigation')
const assetLoaderMiddleware = require('@financial-times/anvil-middleware-ft-asset-loader')

const express = require('express')
const app = express()
const port = 3456

app.use(assetLoaderMiddleware.default({}))

app.use([editionMiddleware.default({}), navigationMiddleware.default({ enableCrumbtrail: true })])

app.get('/', (req, res) => {
  res.send('HELLO WORLD')
})

app.listen(port)

/* eslint-disable no-console */
console.log(`Listening on PORT:${port}`)
