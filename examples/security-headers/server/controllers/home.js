const homeController = (request, response, next) => {
  const renderOptions = {
    pageTitle: 'Security Headers Example App'
  }

  try {
    response.render('home.hbs', renderOptions)
  } catch (error) {
    next(error)
  }
}

module.exports = homeController
