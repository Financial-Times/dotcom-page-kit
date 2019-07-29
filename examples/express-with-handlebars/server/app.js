const express = require('express')
const homePageController = require('./controllers/home')
const { PageKitHandlebars } = require('@financial-times/dotcom-server-handlebars')

const app = (module.exports = express())

app.locals.siteName = 'Good Dogs'

// Add Handlebars as a view engine so controllers may use response.render()
const renderer = new PageKitHandlebars({
  cache: process.env.NODE_ENV === 'production'
})

app.engine('.hbs', renderer.engine)

app.use('/public', express.static('./public'))

app.get('/', homePageController)
