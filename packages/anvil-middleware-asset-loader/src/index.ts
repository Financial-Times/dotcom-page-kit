import path from 'path'
import express from 'express'
import ExtendedAssetLoader from './ExtendedAssetLoader'
import { Handler, Request, Response, NextFunction } from 'express'

interface MiddlewareOptions {
  /**
   * The name of the manifest file which will be resolved from the fileSystemPath option
   * @default "manifest.json"
   */
  manifestFileName?: string

  /**
   * The base URL for assets (as seen by users)
   * @default "/public"
   */
  publicPath?: string

  /**
   * An absolute path to the assets folder on disk
   * @default path.resolve('./public')
   */
  fileSystemPath?: string

  /**
   * Store file contents in memory when accessed
   * @default false
   */
  cacheFileContents?: boolean

  /**
   * Set to true if assets should be served from a local directory
   * @default false
   */
  hostStaticAssets?: boolean
}

const defaultOptions: MiddlewareOptions = {
  manifestFileName: 'manifest.json',
  publicPath: '/public',
  fileSystemPath: path.resolve('./public'),
  cacheFileContents: false,
  hostStaticAssets: false
}

export const init = (userOptions: MiddlewareOptions): Handler[] => {
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
