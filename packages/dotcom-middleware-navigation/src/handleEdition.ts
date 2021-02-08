import { isEdition } from '@financial-times/dotcom-server-navigation'
import { Request, Response } from 'express'

const defaultEdition = 'uk'

export default (request: Request, response: Response): string => {
  // NOTE: The FT-Edition header is set by the CDN and/or next-router...
  // If an edition is selected with a cookie or query string it will be set to that.
  // Otherwise the router will choose the best setting based on GeoIP.
  // <https://github.com/Financial-Times/ft.com-cdn/blob/HEAD/src/vcl/next-editions.vcl>
  // <https://github.com/Financial-Times/next-router/blob/HEAD/server/middleware/editions.js>
  let currentEdition = request.get('FT-Edition') || defaultEdition

  if (typeof request.query.edition === 'string' && isEdition(request.query.edition)) {
    currentEdition = request.query.edition

    response.cookie('next-edition', currentEdition, {
      domain: 'ft.com',
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
    })
  }

  // NOTE: n-express overrides res.set() and res.vary() in order to merge all vary headers together.
  // <https://github.com/Financial-Times/n-express/blob/HEAD/src/middleware/vary.js>
  response.vary('FT-Edition')

  return currentEdition
}
