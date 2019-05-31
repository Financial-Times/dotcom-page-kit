import { Request, Response, NextFunction } from 'express'
import { getAppName, getAppVersion, getAbState, getEdition, isProduction } from './helpers'
import { AppContext, TAppContext } from '@financial-times/anvil-ft-app-context'

interface Options {
  product?: string
  context?: Partial<TAppContext>
  workingDir?: string
  environment?: string
}

export function init(options: Options = {}) {
  const {
    product = 'next',
    workingDir = process.cwd(),
    context: contextOverrides = {},
    environment = process.env.NODE_ENV || 'development'
  } = options

  return (request: Request, response: Response, next: NextFunction) => {
    const state = {
      request,
      response,
      workingDir,
      environment
    }

    const context = {
      app: getAppName(state),
      product: product,
      version: getAppVersion(state),
      abState: getAbState(state),
      edition: getEdition(state),
      isProduction: isProduction(state),
      ...contextOverrides
    }

    response.locals.appContext = new AppContext({ context })

    next()
  }
}
