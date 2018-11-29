import { Navigation } from '@financial-times/anvil-server-ft-navigation'

interface MiddlewareOptions {
  enableCrumbtrail?: boolean
}

const defaultOptions = {
  enableCrumbtrail: false
}

export default (userOptions: MiddlewareOptions = {}) => {
  const options = { ...defaultOptions, ...userOptions }
  const poller = new Navigation(options)

  return async (request, response, next) => {
    try {
      const [navigation, crumbtrail] = await Promise.all([
        poller.getNavigation(),
        options.enableCrumbtrail ? poller.getCrumbtrail(request.path) : null
      ])

      response.locals.navigation = navigation
      response.locals.crumbtrail = {}
      // TODO Question: Are the names crumbtrail.breadcrumb and crumbtrail.subsections
      // compatible with existing n-ui? See `data` keyword.
      response.locals.crumbtrail.breadcrumb = crumbtrail.breadcrumb
      response.locals.crumbtrail.subsections = crumbtrail.subsections

      next()
    } catch (error) {
      next(error)
    }
  }
}
