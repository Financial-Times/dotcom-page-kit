import * as nav from '@financial-times/anvil-server-ft-navigation'
import { Request, Response } from 'express'

const defaultEdition = 'uk'

export default (request: Request, response: Response): string => {
  // NOTE: The FT-Edition header is set by next-router and the CDN.
  // If an edition is selected with a cookie or query string it will be set to that.
  // Otherwise the router will choose the best setting based on GeoIP.
  let currentEdition = request.get('FT-Edition') || defaultEdition

  if (request.query.edition && nav.isEdition(request.query.edition)) {
    currentEdition = request.query.edition

    response.cookie('next-edition', currentEdition, {
      domain: 'ft.com',
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
    })
  }

  return currentEdition
}
