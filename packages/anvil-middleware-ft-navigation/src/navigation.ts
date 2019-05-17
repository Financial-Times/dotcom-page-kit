import { Request, Response, NextFunction } from 'express'
import delve from 'dlv'

import { TNavMenus, TNavMenusForEdition, TNavigationData } from '@financial-times/anvil-types-navigation'
import { Navigation, TNavOptions } from '@financial-times/anvil-server-ft-navigation'
import { navigationEditions } from './navigation-editions'

type MiddlewareOptions = TNavOptions & {
  enableSubNavigation?: boolean
}

const defaultOptions: MiddlewareOptions = {
  enableSubNavigation: false
}

export const getNavigationLinks = (menuData: TNavMenus, currentEdition: string): TNavMenusForEdition => {
  const menuKeys = ['account', 'user', 'anon', 'footer', 'navbar-simple', 'navbar-right', 'navbar-right-anon']

  const output = {
    navbar: menuData[`navbar-${currentEdition}`],
    drawer: menuData[`drawer-${currentEdition}`]
  }

  for (const key of menuKeys) {
    output[key] = menuData[key]
  }

  return output as TNavMenusForEdition
}

export const init = (userOptions: MiddlewareOptions = {}) => {
  const { enableSubNavigation, ...navOptions } = { ...defaultOptions, ...userOptions }
  const navigator = new Navigation(navOptions)

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const [menuData, subNavigation] = await Promise.all([
        navigator.getMenuData(request.path),
        enableSubNavigation ? navigator.getSubNavigation(request.path) : null
      ])
      const currentPath = request.path

      const editions = navigationEditions(request, response)
      const currentEdition = delve(editions, 'current.id', 'uk')

      const navigationData: TNavigationData = {
        currentPath,
        ...subNavigation,
        ...getNavigationLinks(menuData, currentEdition),
        editions
      }

      response.locals.navigation = navigationData

      next()
    } catch (error) {
      next(error)
    }
  }
}
