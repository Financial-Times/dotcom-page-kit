const ReactDOMServer = require('react-dom/server')
const { HeaderDefault } = require('@financial-times/anvil-ui-ft-header')
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

module.exports = (_, response, next) => {
  headerProps.editions = response.locals.editions
  // TODO Set data to response.locals.navigation.main once editions are fixed
  headerProps.data.navbar = response.locals.navigation.main['navbar-uk']
  headerProps.data['navbar-simple'] = response.locals.navigation.main['navbar-simple']
  headerProps.data['navbar-right'] = response.locals.navigation.main['navbar-right']
  headerProps.data['navbar-right-anon'] = response.locals.navigation.main['navbar-right-anon']

  try {
    const html = ReactDOMServer.renderToStaticMarkup(HeaderDefault(headerProps))
    const page = document(html)

    response.send(page)
  } catch (error) {
    next(error)
  }
}
