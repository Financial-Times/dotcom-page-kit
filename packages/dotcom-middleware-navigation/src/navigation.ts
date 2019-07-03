import { Request, Response, NextFunction } from 'express'
import { TNavigationData } from '@financial-times/dotcom-types-navigation'
import { Navigation, TNavOptions } from '@financial-times/dotcom-server-navigation'
import handleEdition from './handleEdition'

type MiddlewareOptions = TNavOptions & {
  enableSubNavigation?: boolean
}

const defaultOptions: MiddlewareOptions = {
  enableSubNavigation: false
}

export const init = (userOptions: MiddlewareOptions = {}) => {
  const options = { ...defaultOptions, ...userOptions }
  const navigation = new Navigation(options)

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const currentPath = request.path
      const currentEdition = handleEdition(request, response)

      const [menusData, subNavigationData] = await Promise.all([
        navigation.getMenusFor(currentPath, currentEdition),
        options.enableSubNavigation ? navigation.getSubNavigationFor(currentPath) : null
      ])

      const editions = navigation.getEditionsFor(currentEdition)

      const navigationData: TNavigationData = {
        editions,
        currentPath,
        ...menusData,
        ...subNavigationData
      }

      response.locals.navigation = navigationData

      next()
    } catch (error) {
      next(error)
    }
  }
}
