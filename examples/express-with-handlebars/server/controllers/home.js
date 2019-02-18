const dogData = require('../lib/data.json')

module.exports = async (request, response, next) => {
  const renderOptions = {
    pageTitle: 'Welcome',
    layout: 'main',
    dogData
  }

  try {
    response.render('home.hbs', renderOptions)
  } catch (error) {
    next(error)
  }
}
