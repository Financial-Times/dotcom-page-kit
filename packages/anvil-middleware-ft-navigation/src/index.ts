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
      response.locals.crumbtrail.breadcrumb = crumbtrail && crumbtrail.breadcrumb
      response.locals.crumbtrail.subsections = crumbtrail && crumbtrail.subsections

      next()
    } catch (error) {
      next(error)
    }
  }
}
