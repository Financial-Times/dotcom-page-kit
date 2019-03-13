import AssetLoader from '@financial-times/anvil-server-asset-loader'
import ResourceHints from '@financial-times/anvil-server-resource-hints'
import { MiddlewareOptions } from './options'
import { Handler, Request, Response, NextFunction } from 'express'

export default (options: MiddlewareOptions): Handler => {
  const loader = new AssetLoader(options)

  return (request: Request, response: Response, next: NextFunction) => {
    const resourceHints = new ResourceHints()
    const originalSendMethod = response.send.bind(response)

    response.locals.assets = { loader, resourceHints }

    // TODO: remove this monkey patching and instruct consumers to do this themselves
    response.send = (chunk) => {
      // Assume the content type is HTML if the chunk is a string
      // <https://github.com/expressjs/express/blob/master/lib/response.js#L141-L147>
      const contentType = response.get('Content-Type')
      const inferAsHTML = !contentType && typeof chunk === 'string'

      if (request.method !== 'HEAD' && (contentType === 'text/html' || inferAsHTML)) {
        response.header('Link', resourceHints.toString())
      }

      return originalSendMethod(chunk)
    }

    next()
  }
}
