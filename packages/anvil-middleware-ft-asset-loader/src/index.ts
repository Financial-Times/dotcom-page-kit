// provides the asset loader methods to templates
// by appending an instance of the asset loader to `response.locals`

import AssetLoader from '@financial-times/anvil-server-asset-loader'
import path from 'path'

export default () => {
  return (request, response, next) => {
    console.log('ASSET LOADER MIDDLEWARE')
    console.log(Boolean(request))
    console.log(Boolean(response))

    const assetLoader = new AssetLoader({
      manifestFile: path.join(process.cwd(), 'example-asset-manifest.json'),
      publicPath: 'https://cdn.site.com/assets',
      fileSystemPath: path.join(process.cwd(), 'public'),
      cacheFileContents: false
    })

    try {
      const publicPath = assetLoader.getPublicPath('example.js')

      response.locals.assets = {
        publicPath
      }

      next()
    } catch (error) {
      next(error)
    }

  }
}
