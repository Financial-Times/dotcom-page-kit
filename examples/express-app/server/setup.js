const handlebars = require('express-handlebars')

module.exports = (app) => {
  app.engine(
    '.hbs',
    handlebars({
      defaultLayout: 'main',
      extname: '.hbs'
    })
  )

  app.set('view engine', '.hbs')
}
