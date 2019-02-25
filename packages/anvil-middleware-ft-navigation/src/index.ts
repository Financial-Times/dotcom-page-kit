import { Request, Response, NextFunction } from 'express'
import { Navigation, TNavOptions } from '@financial-times/anvil-server-ft-navigation'
import { getNavigationForEdition } from './assignNavigationData'

type MiddlewareOptions = TNavOptions & {
  enableCrumbtrail?: boolean
}

const defaultOptions: MiddlewareOptions = {
  enableCrumbtrail: false
}

export const init = (userOptions: MiddlewareOptions = {}) => {
  const { enableCrumbtrail, ...navOptions } = { ...defaultOptions, ...userOptions }
  const navigator = new Navigation(navOptions)

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { navbar, drawer } = getNavigationForEdition(response.locals.editions)
      const [menuData, crumbtrail] = await Promise.all([
        navigator.getMenuData(request.path),
        enableCrumbtrail ? navigator.getCrumbtrail(request.path) : null
      ])

      response.locals.navigation = { crumbtrail, navbar, drawer, ...menuData }

      next()
    } catch (error) {
      next(error)
    }
  }
}
