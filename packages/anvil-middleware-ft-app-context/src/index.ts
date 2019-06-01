import isProduction from './isProduction'
import { AppContext, TAppContext } from '@financial-times/anvil-ft-app-context'
import { Request, Response, NextFunction } from 'express'

interface Options {
  context?: Partial<TAppContext>
  environment?: string
}

export function init(options: Options = {}) {
  const { environment, context: contextOverrides = {} } = options

  return (request: Request, response: Response, next: NextFunction) => {
    const context = {
      app: response.get('ft-app-name'),
      product: 'next',
      version: process.env.SOURCE_VERSION,
      abState: request.get('ft-ab'),
      edition: request.get('ft-edition'),
      isProduction: isProduction(environment),
      ...contextOverrides
    }

    response.locals.appContext = new AppContext({ context })

    next()
  }
}
