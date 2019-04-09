const dogData = require('../lib/data.json')

module.exports = async (request, response, next) => {
  const renderOptions = {
    pageTitle: 'Welcome',
    dogData
  }

  try {
    response.render('home.hbs', renderOptions)
  } catch (error) {
    next(error)
  }
}
