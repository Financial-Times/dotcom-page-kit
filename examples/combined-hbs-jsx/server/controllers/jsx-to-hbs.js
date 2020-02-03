export default function(request, response, next) {
  try {
    response.render('Home.jsx', {
      pageTitle:
        'Example of rendering Handlebars output via JSX (and JSX output from within the Handlebars output)'
    })
  } catch (error) {
    next(error)
  }
}
