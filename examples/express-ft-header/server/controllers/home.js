const ReactDOMServer = require('react-dom/server')
const { HeaderDefault, Drawer } = require('@financial-times/anvil-ui-ft-header')
const document = require('../lib/document')

const headerProps = {
  options: {
    userNav: false,
    disableSticky: false,
    variant: 'simple',
    hideOutboundLinks: false,
    userIsAnonymous: false,
    userIsLoggedIn: true,
    showSubNav: true,
    showSignOut: true
  },
  editions: {},
  data: {}
}

const render = (component) => ReactDOMServer.renderToStaticMarkup(component)

module.exports = (_, response, next) => {
  headerProps.data = response.locals.navigation
  // TODO - This should not be editionsUk
  headerProps.data.editionsUk = response.locals.editions

  try {
    const html = [render(HeaderDefault(headerProps)), render(Drawer(headerProps))].join()
    const page = document(html)
    response.send(page)
  } catch (error) {
    next(error)
  }
}
