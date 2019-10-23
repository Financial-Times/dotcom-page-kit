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

  // Not all pages appear in the navigation so this request will fail often.
  // Because it's not critical, ignore the error and move on.
  const getSubNavigationFor = (currentPath) => navigation.getSubNavigationFor(currentPath).catch(() => {})

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      // The vanity URL will usually be referenced in the navigation data
      // rather than the underlying path, so prefer that when available.
      // <https://github.com/Financial-Times/ft.com-cdn/blob/4841fbf100e1c561a2f6729b9921ec12bb6b837c/src/vcl/next-preflight.vcl#L213-L219>
      const currentPath = request.get('ft-vanity-url') || request.path
      const currentEdition = handleEdition(request, response)

      const [menusData, subNavigationData] = await Promise.all([
        navigation.getMenusFor(currentPath, currentEdition),
        options.enableSubNavigation ? getSubNavigationFor(currentPath) : null
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
