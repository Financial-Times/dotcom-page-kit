import AssetLoader from '@financial-times/anvil-server-asset-loader'
import ResourceHints from './ResourceHints'
import { MiddlewareOptions } from './options'
import { Handler, Request, Response, NextFunction } from 'express'

export default (options: MiddlewareOptions): Handler => {
  const loader = new AssetLoader(options)

  return (_: Request, response: Response, next: NextFunction) => {
    const resourceHints = new ResourceHints()
    const originalSendMethod = response.send.bind(response)

    response.locals.assets = { loader, resourceHints }

    response.send = (data) => {
      const mimeType = response.get('Content-Type')
      const inferAsHTML = !mimeType && typeof data === 'string'

      if (mimeType === 'text/html' || inferAsHTML) {
        response.header('Link', resourceHints.toString())
      }

      return originalSendMethod(data)
    }

    next()
  }
}
