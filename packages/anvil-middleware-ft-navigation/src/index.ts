import { Request, Response, NextFunction } from 'express'
import { Navigation } from '@financial-times/anvil-server-ft-navigation'

interface MiddlewareOptions {
  enableCrumbtrail?: boolean
}

const defaultOptions = {
  enableCrumbtrail: false
}

export const init = (userOptions: MiddlewareOptions = {}) => {
  const options = { ...defaultOptions, ...userOptions }
  const navigator = new Navigation(options)

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      response.locals.navigation = {}
      response.locals.navigation.crumbtrail = {}

      const [navigation, crumbtrail] = await Promise.all([
        navigator.getMenuData(request.path),
        options.enableCrumbtrail ? navigator.getCrumbtrail(request.path) : null
      ])

      // TODO Revisit these names
      response.locals.navigation.main = navigation
      response.locals.navigation.crumbtrail.breadcrumb = crumbtrail && crumbtrail.breadcrumb
      response.locals.navigation.crumbtrail.subsections = crumbtrail && crumbtrail.subsections

      next()
    } catch (error) {
      next(error)
    }
  }
}
