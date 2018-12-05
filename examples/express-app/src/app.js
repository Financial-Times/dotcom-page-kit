/* eslint-disable no-console */

const editionMiddleware = require('@financial-times/anvil-middleware-ft-edition')
const navigationMiddleware = require('@financial-times/anvil-middleware-ft-navigation')
const assetLoaderMiddleware = require('@financial-times/anvil-middleware-ft-asset-loader')

const express = require('express')
const app = express()
const port = 3456

const edition = editionMiddleware.default({})
const navigation = navigationMiddleware.default({ enableCrumbtrail: true })
const assetLoader = assetLoaderMiddleware.default()

app.use([edition, navigation, assetLoader])

app.get('/', (req, res) => {
  res.send('HELLO WORLD')
})

app.listen(port)
console.log(`Listening on PORT:${port}`)
