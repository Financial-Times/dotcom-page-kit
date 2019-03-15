const ReactDOMServer = require('react-dom/server')
const { HeaderDefault, Drawer } = require('@financial-times/anvil-ui-ft-header')
const document = require('../lib/document')

const headerProps = {
  userIsAnonymous: false,
  userIsLoggedIn: true,
  showSignOut: true,
  data: {}
}

const render = (component) => ReactDOMServer.renderToStaticMarkup(component)

module.exports = (_, response, next) => {
  headerProps.data = response.locals.navigation
  headerProps.data.editions = response.locals.editions

  try {
    const html = [render(HeaderDefault(headerProps)), render(Drawer(headerProps))].join()
    const page = document(html)
    response.send(page)
  } catch (error) {
    next(error)
  }
}
