import { Navigation } from '@financial-times/anvil-server-ft-navigation'

export default (options = {}) => {
  const poller = new Navigation(options)

  return async (request, response, next) => {
    console.log('** NAVIGATION MIDDLEWARE **')
    console.log('** request', Boolean(request))
    try {
      const [ navigation, crumbtrail ] = await Promise.all([
        poller.getNavigation(),
        poller.getCrumbtrail(request.path)
      ])

      console.log('** response.locals.editions', response.locals.editions, '\n')

      response.locals.navigation = navigation
      response.locals.crumbtrail = crumbtrail

      console.log('** response.locals.navigation', response.locals.navigation, '\n')
      console.log('** response.locals.crumbtrail', response.locals.crumbtrail, '\n')

      next()
    } catch (error) {
      next(error)
    }
  }
}
