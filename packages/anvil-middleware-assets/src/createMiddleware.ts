import { AssetLoader } from '@financial-times/dotcom-server-asset-loader'
import { ResourceHints } from '@financial-times/dotcom-server-resource-hints'
import { MiddlewareOptions } from './options'
import { Handler, Request, Response, NextFunction } from 'express'

export default (options: MiddlewareOptions): Handler => {
  const loader = new AssetLoader(options)

  return (_: Request, response: Response, next: NextFunction) => {
    const resourceHints = new ResourceHints()

    response.locals.assets = { loader, resourceHints }

    next()
  }
}
