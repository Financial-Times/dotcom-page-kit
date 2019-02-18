const editionMiddleware = require('@financial-times/anvil-middleware-ft-edition')
const navigationMiddleware = require('@financial-times/anvil-middleware-ft-navigation')

const edition = editionMiddleware.init()
const navigation = navigationMiddleware.init({ enableCrumbtrail: true })

module.exports = [edition, navigation]
