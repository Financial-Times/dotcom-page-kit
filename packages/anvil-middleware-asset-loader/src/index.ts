import AssetLoader from '@financial-times/anvil-server-asset-loader'
import path from 'path'
import express from 'express'

interface MiddlewareOptions {
  /** The absolute path to the asset manifest.json */
  manifestFile: string
  /** The public-facing URL associated with the static assets */
  publicPath: string
  /** An asset loader option. Set to true if files should be cached in memory when accessed  */
  cacheFileContents: boolean
  /** Set to true if assets should be served from a local directory */
  hostStaticAssets: boolean
  /** The absolute path to the directory of static assets */
  fileSystemPath: string
}

const defaultOptions = {
  manifestFile: path.resolve('./public/manifest.json'),
  publicPath: '/public',
  cacheFileContents: false,
  fileSystemPath: path.resolve('./public'),
  hostStaticAssets: false
}

export const init = (userOptions?) => {
  const options: MiddlewareOptions = { ...defaultOptions, ...userOptions }
  const loader = new AssetLoader(options)

  // _ indicates an unused request parameter
  function middleware(_, response, next) {
    response.locals.assets = { loader }
    next()
  }

  const router = express.Router()
  router.use(options.publicPath, express.static(options.fileSystemPath))

  const stack = [middleware]

  if (options.hostStaticAssets) {
    stack.push(router)
  }

  return stack
}
