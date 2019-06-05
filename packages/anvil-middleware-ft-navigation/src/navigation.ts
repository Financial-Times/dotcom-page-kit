import { Request, Response, NextFunction } from 'express'
import { Navigation, TNavOptions } from '@financial-times/anvil-server-ft-navigation'
import getEdition from './getEdition'

type MiddlewareOptions = TNavOptions & {
  enableSubNavigation?: boolean
}

const defaultOptions: MiddlewareOptions = {
  enableSubNavigation: false
}

export const init = (userOptions: MiddlewareOptions = {}) => {
  const options = { ...defaultOptions, ...userOptions }
  const navigator = new Navigation(options)

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const currentPath = request.path
      // TODO: vary on selected edition
      const currentEdition = getEdition(request, response)

      const [navigationData, subNavigationData] = await Promise.all([
        navigator.getNavigationFor(currentPath, currentEdition),
        options.enableSubNavigation ? navigator.getSubNavigationFor(currentPath) : null
      ])

      response.locals.navigation = { ...navigationData, ...subNavigationData }

      next()
    } catch (error) {
      next(error)
    }
  }
}
