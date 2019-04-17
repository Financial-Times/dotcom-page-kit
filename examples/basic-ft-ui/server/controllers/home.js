const React = require('react')
const ReactDOMServer = require('react-dom/server')
const Document = require('../components/Document')

module.exports = (_, response, next) => {
  const headerProps = {
    data: { ...response.locals.navigation, editions: response.locals.editions }
  }

  try {
    const page = React.createElement(Document, { headerProps })
    response.send('<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(page))
  } catch (error) {
    next(error)
  }
}
