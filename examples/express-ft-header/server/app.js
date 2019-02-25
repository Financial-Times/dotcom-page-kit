const express = require('express')

const app = express()

app.use(require('./middleware/anvil'))

app.get('/', require('./controllers/home'))

module.exports = app
