/* eslint-disable no-console */

const editionMiddleware = require('@financial-times/anvil-middleware-ft-edition')

const express = require('express')
const app = express()
const port = 3456

const middleware = editionMiddleware.default({})
app.use(middleware)

app.get('/', (req, res) => {
  res.send('HELLO WORLD')
})

app.listen(port)
console.log(`Listening on PORT:${port}`)
