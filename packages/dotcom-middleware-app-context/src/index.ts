import { Request, Response, NextFunction } from 'express'
import { AppContext, TAppContext } from '@financial-times/dotcom-server-app-context'

export type TMiddlewareOptions = {
  context?: Partial<TAppContext>
}

export function init(options: TMiddlewareOptions = {}) {
  return (request: Request, response: Response, next: NextFunction) => {
    const context = {
      // TODO: improve how we retrieve the app name.
      // HACK: this is plucked from the debug headers set by n-express:
      // https://github.com/Financial-Times/n-express/blob/master/main.js#L76-L80
      appName: response.get('ft-app-name'),
      product: 'next',
      edition: request.get('ft-edition'),
      appVersion: process.env.CIRCLE_SHA1 || process.env.SOURCE_VERSION || process.env.HEROKU_SLUG_COMMIT,
      // Many headers are set to a default value of "-" by the CDN so we need to ignore those
      // https://github.com/Financial-Times/ft.com-cdn/blob/master/src/vcl/next-preflight.vcl
      abTestState: request.get('ft-ab') === '-' ? undefined : request.get('ft-ab'),
      isProduction: process.env.NODE_ENV === 'production',
      ...options.context
    }

    const appContext = new AppContext({ context })

    try {
      appContext.validate()
    } catch (error) {
      next(error)
    }

    response.locals.appContext = appContext

    next()
  }
}
