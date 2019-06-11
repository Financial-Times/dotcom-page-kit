import isProduction from './isProduction'
import { Request, Response, NextFunction } from 'express'
import { AppContextClient, TAppContext, ensureValidAppContext } from '@financial-times/anvil-ft-app-context'

interface Options {
  context?: Partial<TAppContext>
  environment?: string
}

export function init(options: Options = {}) {
  const { environment, context: contextOverrides = {} } = options

  ensureValidAppContext(contextOverrides)

  return (request: Request, response: Response, next: NextFunction) => {
    const context = {
      appName: response.get('ft-app-name'),
      product: 'next',
      edition: request.get('ft-edition'),
      appVersion: process.env.SOURCE_VERSION,
      abTestState: request.get('ft-ab'),
      isProduction: isProduction(environment),
      ...contextOverrides
    }

    response.locals.appContext = new AppContextClient({ context })

    next()
  }
}
