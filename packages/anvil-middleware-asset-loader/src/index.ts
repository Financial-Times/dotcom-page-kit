import path from 'path'
import express from 'express'
import ExtendedAssetLoader from './ExtendedAssetLoader'
import { Handler, Request, Response, NextFunction } from 'express'
import { AssetLoaderOptions } from '@financial-times/anvil-server-asset-loader'

export interface MiddlewareOptions extends AssetLoaderOptions {
  /**
   * Set to true if assets should be served from a local directory
   * @default false
   */
  hostStaticAssets?: boolean
}

const defaultOptions: MiddlewareOptions = {
  hostStaticAssets: false,
  publicPath: '/public',
  fileSystemPath: path.resolve('./public')
}

export function init(userOptions: MiddlewareOptions): Handler[] {
  const options: MiddlewareOptions = { ...defaultOptions, ...userOptions }

  // _ indicates an unused request parameter
  function middleware(_: Request, response: Response, next: NextFunction) {
    response.locals.assets = new ExtendedAssetLoader(options)

    const originalSendMethod = response.send.bind(response)

    // Intercept the original send method to add a link header to HTML responses
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

  const stack = [middleware]

  if (options.hostStaticAssets) {
    const router = express.Router()
    router.use(options.publicPath, express.static(options.fileSystemPath))
    stack.push(router)
  }

  return stack
}
