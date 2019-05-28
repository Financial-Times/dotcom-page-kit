import { Request, Response, NextFunction } from 'express'
import { getAppName, getAppVersion, getAbState, getEdition, isProduction } from './helpers'
import { AppContext, TAppContext } from '@financial-times/anvil-ft-app-context'

interface Options {
  env?: string
  product?: string
  context?: Partial<TAppContext>
  workingDir?: string
}

export function init(options: Options = {}) {
  const {
    product = 'next',
    workingDir = process.cwd(),
    context: contextOverrides = {},
    env = process.env.NODE_ENV
  } = options

  return (request: Request, response: Response, next: NextFunction) => {
    const state = { request, response, env, workingDir }

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
