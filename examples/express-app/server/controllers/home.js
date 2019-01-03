const render = require('../lib/render')

module.exports = async (request, response) => {
  const options = {
    pageTitle: 'Home',
    foo: 'foo',
    bar: 'bar',
    baz: 'baz'
  }

  try {
    // When calling Express's `.render()` method locals will be appended to view data.
    // <https://github.com/expressjs/express/blob/master/lib/application.js#L545-L554>
    const data = { ...request.app.locals, ...response.locals, ...options }
    const html = await render('home', data)

    response.send(html)
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
    response.status(500).send('Oh no, something went wrong!')
  }
}
