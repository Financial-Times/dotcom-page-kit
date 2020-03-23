export default function (request, response, next) {
  try {
    response.render('home.hbs', {
      pageTitle:
        'Example of rendering JSX output via Handlebars (and Handlebars output from within the JSX output)'
    })
  } catch (error) {
    next(error)
  }
}
