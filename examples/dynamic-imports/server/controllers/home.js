const polyfillService = require('@financial-times/dotcom-ui-polyfill-service')

module.exports = (request, response, next) => {
  const renderOptions = {
    pageTitle: 'Dynamically-loaded dogs',
    polyfillServiceUrl: polyfillService.enhanced()
  }

  try {
    response.render('home.hbs', renderOptions)
  } catch (error) {
    next(error)
  }
}
