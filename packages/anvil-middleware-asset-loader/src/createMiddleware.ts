import { MiddlewareOptions } from './options'
import { Handler, Request, Response, NextFunction } from 'express'
import ExtendedAssetLoader from './ExtendedAssetLoader'

export default (options: MiddlewareOptions): Handler => {
  // _ indicates an unused request parameter
  return (_: Request, response: Response, next: NextFunction) => {
    response.locals.assets = new ExtendedAssetLoader(options)

    const originalSendMethod = response.send.bind(response)

    response.send = (data) => {
      const mimeType = response.get('Content-Type')
      const inferAsHTML = !mimeType && typeof data === 'string'

      if (mimeType === 'text/html' || inferAsHTML) {
        const resourceHints = response.locals.assets.formatResourceHints()
        response.header('Link', resourceHints)
      }

      return originalSendMethod(data)
    }

    next()
  }
}
