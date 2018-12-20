module.exports = (request, response) => {
  const data = {
    pageTitle: 'Home',
    foo: 'foo',
    bar: 'bar',
    baz: 'baz'
  }

  response.render('home', { ...response.locals, ...data })
}
