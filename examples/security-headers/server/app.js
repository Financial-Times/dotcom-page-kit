const express = require('express')
const { PageKitHandlebars } = require('@financial-times/dotcom-server-handlebars')
const featurePolicyMiddleware = require('@financial-times/dotcom-middleware-feature-policy')
const homeController = require('./controllers/home')

const app = (module.exports = express())

// Add Handlebars as a view engine so controllers may use response.render()
const renderer = new PageKitHandlebars({
  cache: process.env.NODE_ENV === 'production'
})

app.engine('.hbs', renderer.engine)

app.use('/public', express.static('./public'))

app.use(featurePolicyMiddleware.init())

app.get('/', homeController)
