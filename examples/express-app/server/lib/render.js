const path = require('path')
const handlebars = require('@financial-times/n-handlebars')

const options = {
  directory: process.cwd(),
  defaultLayout: 'main',
  extname: '.hbs',
  viewsDirectory: 'views',
  layoutsDir: 'views/layouts',
  partialsDir: [
    'views/partials',
    'node_modules/@financial-times',
    'node_modules/@financial-times/n-ui/components',
    'node_modules/@financial-times/n-ui/browser'
  ]
}

const setup = handlebars.standalone(options)

function render(handlebars, view, context) {
  return new Promise((resolve, reject) => {
    const templateFile = path.join(options.viewsDirectory, `${view}${options.extname}`)

    handlebars.renderView(templateFile, context, (error, rendered) => {
      return error ? reject(error) : resolve({
        html: rendered,
        // Unused blocks (created with the #defineBlock helper) can be pulled out
        slots: context.blocks
      })
    })
  })
}

module.exports = (view, context) => {
  return setup.then((handlebars) => render(handlebars, view, context))
}
