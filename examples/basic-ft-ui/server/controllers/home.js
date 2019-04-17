const ReactDOM = require('react-dom/server')
const Document = require('../components/Document')

module.exports = (_, response, next) => {
  const navigationData = { ...response.locals.navigation, editions: response.locals.editions }

  try {
    const page = Document({ navigationData })
    response.send('<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(page))
  } catch (error) {
    next(error)
  }
}
