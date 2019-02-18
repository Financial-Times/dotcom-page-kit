// TODO: fetch real data
const navbarUK = require('@financial-times/anvil-ui-ft-header/src/story-data/navbarUk.json')
const navbarSimple = require('@financial-times/anvil-ui-ft-header/src/story-data/navbarSimple.json')
const navbarRight = require('@financial-times/anvil-ui-ft-header/src/story-data/navbarRight.json')
const navbarRightAnon = require('@financial-times/anvil-ui-ft-header/src/story-data/navbarRightAnon.json')

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
  data: {
    navbar: navbarUK,
    'navbar-simple': navbarSimple,
    'navbar-right': navbarRight,
    'navbar-right-anon': navbarRightAnon
  }
}

module.exports = (_, response, next) => {
  try {
    const html = ReactDOMServer.renderToStaticMarkup(HeaderDefault(headerProps))
    const page = document(html)

    response.send(page)
  } catch (error) {
    next(error)
  }
}
