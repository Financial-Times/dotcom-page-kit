module.exports = async (request, response, next) => {
  const renderOptions = {
    pageTitle: 'Dynamically-loaded dogs'
  }

  try {
    response.render('home.hbs', renderOptions)
  } catch (error) {
    next(error)
  }
}
