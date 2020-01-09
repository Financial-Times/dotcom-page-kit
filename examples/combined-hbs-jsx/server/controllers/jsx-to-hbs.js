export default function(request, response, next) {
  try {
    response.render('Home.jsx', {
      pageTitle: 'Example of JSX output passed to a Handlebars partial template'
    })
  } catch (error) {
    next(error)
  }
}
