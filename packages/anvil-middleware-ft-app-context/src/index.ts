import { Request, Response, NextFunction } from 'express'
import { AppContextClient, TAppContext } from '@financial-times/anvil-ft-app-context'

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
      appVersion: process.env.SOURCE_VERSION,
      abTestState: request.get('ft-ab'),
      isProduction: process.env.NODE_ENV === 'production',
      ...options.context
    }

    response.locals.appContext = new AppContextClient({ context })

    next()
  }
}
