import AssetLoader from '@financial-times/anvil-server-asset-loader'
import path from 'path'
import express from 'express'

interface MiddlewareOptions {
  /** The absolute path to the asset manifest.json */
  manifestFile: string
  /** The public-facing URL associated with the static assets */
  publicPath: string
  /** Boolean - set to true if files should be cached in memory when accessed  */
  cacheFileContents: boolean
  /** Boolean - set to true if assets should be served from a local directory */
  hostStaticAssets
  /** The absolute path to the directory of static assets */
  fileSystemPath: string
}

const defaultOptions = {
  manifestFile: path.join(process.cwd(), 'public', 'manifest.json'),
  publicPath: '/public',
  cacheFileContents: false,
  fileSystemPath: path.join(process.cwd(), 'public'),
  hostStaticAssets: false
}

export default (userOptions?) => {
  const options: MiddlewareOptions = { ...defaultOptions, ...userOptions }
  const loader = new AssetLoader(options)

  // _ indicates an unused request parameter
  function middleware(_, response, next) {
    response.locals.assets = { loader }
    next()
  }

  const router = express.Router()
  router.use(options.publicPath, express.static(options.fileSystemPath))

  return [middleware, options.hostStaticAssets ? router : null]
}
