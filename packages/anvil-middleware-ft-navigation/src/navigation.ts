import { Request, Response, NextFunction } from 'express'
import delve from 'dlv'

import { TNavigationLinks } from './types'
import { Navigation, TNavOptions, TNavMenus } from '@financial-times/anvil-server-ft-navigation'

type MiddlewareOptions = TNavOptions & {
  enableSubNavigation?: boolean
}

const defaultOptions: MiddlewareOptions = {
  enableSubNavigation: false
}

export const getNavigationLinks = (menuData: TNavMenus, edition: string): TNavigationLinks => {
  const menuKeys = ['account', 'user', 'anon', 'footer', 'navbar-simple', 'navbar-right', 'navbar-right-anon']
  const navbar = menuData[`navbar-${edition}`]
  const drawer = menuData[`drawer-${edition}`]

  return menuKeys.reduce(
    (acc, menuId) => {
      acc[menuId] = menuData[menuId]
      return acc
    },
    { navbar, drawer }
  )
}

export const init = (userOptions: MiddlewareOptions = {}) => {
  const { enableSubNavigation, ...navOptions } = { ...defaultOptions, ...userOptions }
  const navigator = new Navigation(navOptions)

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const [menuData, crumbtrail] = await Promise.all([
        navigator.getMenuData(request.path),
        enableSubNavigation ? navigator.getCrumbtrail(request.path) : null
      ])
      const currentPath = request.path

      // response.locals.editions is set by cookie (on ft.com by visiting /?edition={edition})
      // defaults to "uk"
      const edition = delve(response.locals.editions, 'current.id', 'uk')
      response.locals.navigation = { currentPath, crumbtrail, ...getNavigationLinks(menuData, edition) }

      next()
    } catch (error) {
      next(error)
    }
  }
}
