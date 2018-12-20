const render = require('../lib/render')

module.exports = async (request, response) => {
  const data = {
    pageTitle: 'Home',
    foo: 'foo',
    bar: 'bar',
    baz: 'baz'
  }

  try {
    const html = await render('home', { ...request.app.locals, ...response.locals, ...data })
    response.send(html)
  } catch (error) {
    console.error(error)
    response.send(500, 'Oh no, something went wrong!')
  }
}
