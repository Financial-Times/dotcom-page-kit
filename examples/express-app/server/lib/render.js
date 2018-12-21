const { default: Handlebars } = require('@financial-times/anvil-server-ft-handlebars')

const handlebars = new Handlebars({
  extname: '.hbs'
})

module.exports = handlebars.render.bind(handlebars)
