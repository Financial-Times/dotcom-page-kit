module.exports = (options = {}) => {
  return (request, response, next) => {
    const availableEditions = [
      {
        id: 'uk',
        name: 'UK',
        url: '/'
      },
      {
        id: 'international',
        name: 'International',
        url: '/'
      }
    ]
    const editionIds = availableEditions.map((edition) => edition.id)
    let currentEdition = request.get('FT-Edition') || 'uk'

    // if query string contains ?edition=..., switch to that edition (and save in a cookie)
    const selectedEdition = request.query.edition

    if (selectedEdition && editionIds.indexOf(selectedEdition) > -1) {
      currentEdition = selectedEdition
      // set cookie for a year
      response.cookie('next-edition', currentEdition, {
        domain: 'ft.com',
        maxAge: 1000 * 60 * 60 * 24 * 365
      })
    }

    response.locals.editions = {
      current: availableEditions.find((edition) => edition.id === currentEdition),
      others: availableEditions.filter((edition) => edition.id !== currentEdition)
    }

    response.vary('FT-Edition')
    next()
  }
}
