export default function(request, response, next) {
  try {
    response.render('home.hbs', { pageTitle: 'Example of Handlebars output passed to a JSX component' })
  } catch (error) {
    next(error)
  }
}
