/* eslint-disable no-console */

const editionMiddleware = require('@financial-times/anvil-middleware-ft-edition')
const navigationMiddleware = require('@financial-times/anvil-middleware-ft-navigation')

const express = require('express')
const app = express()
const port = 3456

const edition = editionMiddleware.default({})
const navigation = navigationMiddleware.default({ enableCrumbtrail: true })

app.use(edition)
app.use(navigation)

app.get('/', (req, res) => {
  res.send('HELLO WORLD')
})

app.listen(port)
console.log(`Listening on PORT:${port}`)
