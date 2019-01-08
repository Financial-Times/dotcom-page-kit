const abStateMiddleware = require('@financial-times/anvil-middleware-ft-ab-state')
const editionMiddleware = require('@financial-times/anvil-middleware-ft-edition')
const navigationMiddleware = require('@financial-times/anvil-middleware-ft-navigation')
const assetLoaderMiddleware = require('@financial-times/anvil-middleware-asset-loader')

module.exports = [
  assetLoaderMiddleware.init({
    hostStaticAssets: true,
    fileSystemPath: './dist'
  }),
  abStateMiddleware.init({}),
  editionMiddleware.init({}),
  navigationMiddleware.init({ enableCrumbtrail: true })
]
