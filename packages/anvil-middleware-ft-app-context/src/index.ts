import { Request, Response, NextFunction } from 'express'
import { AppContextClient, TAppContext, ensureValidAppContext } from '@financial-times/anvil-ft-app-context'

interface Options {
  context?: Partial<TAppContext>
}

export function init(options: Options = {}) {
  const { context: contextOverrides = {} } = options

  ensureValidAppContext(contextOverrides)

  return (request: Request, response: Response, next: NextFunction) => {
    const context = {
      // TODO: refactor app name so that we don't need to assume this will get set by n-express
      appName: response.get('ft-app-name'),
      product: 'next',
      edition: request.get('ft-edition'),
      appVersion: process.env.SOURCE_VERSION,
      abTestState: request.get('ft-ab'),
      isProduction: process.env.NODE_ENV === 'production',
      ...contextOverrides
    }

    response.locals.appContext = new AppContextClient({ context })

    next()
  }
}
