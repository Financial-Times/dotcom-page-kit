const abStateMiddleware = require('@financial-times/anvil-middleware-ft-ab-state')
const editionMiddleware = require('@financial-times/anvil-middleware-ft-edition')
const navigationMiddleware = require('../../../../packages/anvil-middleware-ft-navigation')
const assetsMiddleware = require('@financial-times/anvil-middleware-assets')

module.exports = [
  assetsMiddleware.init({
    hostStaticAssets: true,
    fileSystemPath: './dist'
  }),
  abStateMiddleware.init({}),
  editionMiddleware.init({}),
  navigationMiddleware.init({ enableCrumbtrail: true })
]
