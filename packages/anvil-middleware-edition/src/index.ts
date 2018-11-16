module.exports = (options = {}) => {
  console.log('*** Middleware O **')
  console.log('*** options', options)
  return (request, response, next) => {
    console.log('*** Middleware 1 **')
    next()
  }
}
