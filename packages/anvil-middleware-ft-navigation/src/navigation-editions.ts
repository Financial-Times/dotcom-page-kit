export const navigationEditions = (request, response) => {
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
  const editionIds = availableEditions.map((e) => e.id)

  // An FT-Edition cookie is set on ft.com by visiting /?edition={edition}
  // defaults to "uk"
  let currentEdition = request.get('FT-Edition') || 'uk'

  // if query string contains ?edition=..., serve that edition and save preference in a cookie
  const selectedEdition = request.query.edition

  if (selectedEdition && editionIds.includes(selectedEdition)) {
    currentEdition = selectedEdition
    response.cookie('next-edition', currentEdition, {
      domain: 'ft.com',
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
    })
  }

  return {
    current: availableEditions.find((edition) => edition.id === currentEdition),
    others: availableEditions.filter((edition) => edition.id !== currentEdition)
  }
}