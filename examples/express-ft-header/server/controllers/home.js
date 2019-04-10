const ReactDOMServer = require('react-dom/server')
const { Header, Drawer } = require('@financial-times/anvil-ui-ft-header')
const document = require('../lib/document')

const headerProps = {
  userIsAnonymous: false,
  userIsLoggedIn: true,
  data: {}
}

console.log("Header", Header);


const render = (component) => ReactDOMServer.renderToStaticMarkup(component)

module.exports = (_, response, next) => {
  headerProps.data = response.locals.navigation
  headerProps.data.editions = response.locals.editions

  try {
    const html = [render(Header(headerProps)), render(Drawer(headerProps))].join()
    const page = document(html)
    response.send(page)
  } catch (error) {
    next(error)
  }
}
