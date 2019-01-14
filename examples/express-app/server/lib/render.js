const { default: Handlebars } = require('@financial-times/anvil-server-ft-handlebars')

const handlebars = new Handlebars({
  extname: '.hbs'
})

module.exports = (app) => {
  // Enable caching to avoid looking up partials for each render. The partials
  // lookup can be very slow due to a generic glob pattern.
  app.enable('view cache')

  // Add Handlebars as a view engine so controllers may use response.render()
  app.engine('.hbs', handlebars.engine)
}
