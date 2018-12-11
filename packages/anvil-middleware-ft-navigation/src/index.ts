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
      response.locals.navigation = {}
      response.locals.navigation.crumbtrail = {}

      const [navigation, crumbtrail] = await Promise.all([
        poller.getNavigation(),
        options.enableCrumbtrail ? poller.getCrumbtrail(request.path) : null
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
