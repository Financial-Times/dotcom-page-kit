const express = require('express')
const path = require('path')

const app = express()

app.get('/', (_, response) => response.sendFile(path.resolve('./views/index.html')))

module.exports = app
