import delve from 'dlv'
import { Request, Response, NextFunction } from 'express'
import { TNavMenus, TNavMenusForEdition, TNavigationData } from '@financial-times/anvil-types-navigation'
import { Navigation, TNavOptions } from '@financial-times/anvil-server-ft-navigation'
import getEditions from './getEditions'

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
  const options = { ...defaultOptions, ...userOptions }
  const navigator = new Navigation(options)

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const currentPath = request.path

      const [menuData, subNavigation] = await Promise.all([
        navigator.getNavigationFor(currentPath),
        options.enableSubNavigation ? navigator.getSubNavigationFor(currentPath) : null
      ])

      const editions = getEditions(request, response)
      const currentEdition = delve(editions, 'current.id', 'uk')

      const navigationData: TNavigationData = {
        editions,
        currentPath,
        ...subNavigation,
        ...getNavigationLinks(menuData, currentEdition)
      }

      response.locals.navigation = navigationData

      next()
    } catch (error) {
      next(error)
    }
  }
}
