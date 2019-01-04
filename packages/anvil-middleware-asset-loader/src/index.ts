import AssetLoader from '@financial-times/anvil-server-asset-loader'
import path from 'path'
import express from 'express'

interface MiddlewareOptions {
  /** The name of the manifest file which will be resolved from the fileSystemPath option */
  manifestFileName: string
  /** The base URL for assets (as seen by users) */
  publicPath: string
  /** An absolute path to the assets folder on disk */
  fileSystemPath: string
  /** Store file contents in memory when accessed */
  cacheFileContents: boolean
  /** Set to true if assets should be served from a local directory */
  hostStaticAssets: boolean
}

const defaultOptions: MiddlewareOptions = {
  manifestFileName: 'manifest.json',
  publicPath: '/public',
  fileSystemPath: path.resolve('./public'),
  cacheFileContents: false,
  hostStaticAssets: false
}

export const init = (userOptions: Partial<MiddlewareOptions>) => {
  const options: MiddlewareOptions = { ...defaultOptions, ...userOptions }
  const loader = new AssetLoader(options)

  // _ indicates an unused request parameter
  function middleware(_, response, next) {
    response.locals.assets = { loader }
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
