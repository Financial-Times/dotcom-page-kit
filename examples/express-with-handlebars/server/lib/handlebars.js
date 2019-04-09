const AnvilHandlebars = require('@financial-times/anvil-server-handlebars')

module.exports = new AnvilHandlebars({
  cache: process.env.NODE_ENV === 'production'
})
