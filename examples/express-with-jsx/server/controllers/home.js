import catData from '../lib/data.json'

export function homePageController(request, response, next) {
  const renderOptions = {
    pageTitle: 'Welcome',
    catData
  }

  try {
    response.render('Home.jsx', renderOptions)
  } catch (error) {
    next(error)
  }
}
