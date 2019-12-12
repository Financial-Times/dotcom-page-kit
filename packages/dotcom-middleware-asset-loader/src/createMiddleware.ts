import { AssetLoader } from '@financial-times/dotcom-server-asset-loader'
import { MiddlewareOptions } from './options'
import { Handler, Request, Response, NextFunction } from 'express'

export default (options: MiddlewareOptions): Handler => {
  const loader = new AssetLoader(options)

  return (_: Request, response: Response, next: NextFunction) => {
    response.locals.assetLoader = loader
    next()
  }
}
