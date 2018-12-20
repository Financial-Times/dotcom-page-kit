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

    handlebars.renderView(templateFile, context, (error, html) => {
      if (error) {
        reject(error)
      } else {
        resolve({
          html,
          // Unused blocks (created with the #defineBlock helper) can be pulled out now
          // <https://github.com/Financial-Times/n-handlebars/blob/master/src/helpers/outputBlock.js>
          slots: context.blocks ? formatBlocks(context.blocks) : {}
        })
      }
    })
  })
}

function formatBlocks(blocks = {}) {
  return Object.entries(blocks).reduce((blocks, [ key, value ]) => {
    // Blocks may be used multiple times
    if (Array.isArray(value)) {
      blocks[key] = value.join('\n')
    } else {
      blocks[key] = value
    }

    return blocks
  }, {})
}

module.exports = (view, context) => {
  return setup.then((handlebars) => render(handlebars, view, context))
}
