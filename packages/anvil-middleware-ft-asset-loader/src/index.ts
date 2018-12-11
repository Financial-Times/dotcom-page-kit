import AssetLoader from '@financial-times/anvil-server-asset-loader'
import path from 'path'
import express from 'express'

interface MiddlewareOptions {
  /** Specify the location of manifest.json */
  manifestFile
  /** Specify the public path to local/production assets */
  publicPath
  /** Specify the file path to where the assets are actually stored  */
  fileSystemPath
  /** Specify if files should be cached in memory when accessed  */
  cacheFileContents
  /** Specify if assets should be served from a local directory */
  hostStaticAssets
}

const defaultOptions = {
  manifestFile: path.join(process.cwd(), 'public', 'manifest.json'),
  publicPath: '/',
  fileSystemPath: path.join(process.cwd(), 'public'),
  cacheFileContents: false,
  hostStaticAssets: process.env.NODE_ENV !== 'production'
}

export default (userOptions?) => {
  const options: MiddlewareOptions = { ...defaultOptions, ...userOptions }
  const loader = new AssetLoader(options)
  // _ indicates an unused request parameter
  const middleware = (_, response, next) => {
    response.locals.assets = { loader }
    next()
  }

  const router = express.Router()
  router.use(options.publicPath, express.static(options.fileSystemPath))

  return [middleware, options.hostStaticAssets ? router : null]
}
