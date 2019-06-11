const express = require('express')
const homePageController = require('./controllers/home')
const { HandlebarsRenderer } = require('@financial-times/anvil-server-handlebars')

const app = (module.exports = express())

app.locals.siteName = 'Good Dogs'

// Add Handlebars as a view engine so controllers may use response.render()
const renderer = new HandlebarsRenderer({
  cache: process.env.NODE_ENV === 'production'
})

app.engine('.hbs', renderer.engine)

app.use('/public', express.static('./public'))

app.get('/', homePageController)
