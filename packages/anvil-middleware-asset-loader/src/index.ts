import path from 'path'
import express from 'express'
import ExtendedAssetLoader from './resource-hints/ExtendedAssetLoader'

interface MiddlewareOptions {
  /**
   * The name of the manifest file which will be resolved from the fileSystemPath option
   * @default "manifest.json"
   */
  manifestFileName: string

  /**
   * The base URL for assets (as seen by users)
   * @default "/public"
   */
  publicPath: string

  /**
   * An absolute path to the assets folder on disk
   * @default path.resolve('./public')
   */
  fileSystemPath: string

  /**
   * Store file contents in memory when accessed
   * @default false
   */
  cacheFileContents: boolean

  /**
   * Set to true if assets should be served from a local directory
   * @default false
   */
  hostStaticAssets: boolean
}

const defaultOptions: MiddlewareOptions = {
  manifestFileName: 'manifest.json',
  publicPath: '/public',
  fileSystemPath: path.resolve('./public'),
  cacheFileContents: false,
  hostStaticAssets: false
}

export const init = (userOptions: Partial<MiddlewareOptions>): Function[] => {
  const options: MiddlewareOptions = { ...defaultOptions, ...userOptions }

  // _ indicates an unused request parameter
  function middleware(_, response, next) {
    response.locals.assets = new ExtendedAssetLoader(options)

    const originalSendMethod = response.send.bind(response)

    // Intercept the original send method to add a link header including any requested
    // stylesheet, script, image, or font assets to the response.
    // <https://w3c.github.io/resource-hints/>
    response.send = function(chunk) {
      const type = response.get('Content-Type')

      if (type === 'text/html' || (!type && typeof chunk === 'string')) {
        response.header('Link', response.locals.assets.toString())
      }

      return originalSendMethod(chunk)
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
