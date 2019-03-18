const { getFTBundleAssetUrls } = require('@financial-times/anvil-server-ft-preset')

module.exports = async (request, response) => {
  const assetLoader = response.locals.assets.loader
  const options = {
    pageTitle: 'Home',
    foo: 'foo',
    bar: 'bar',
    baz: 'baz',
    layout: 'main',
    scripts: [getFTBundleAssetUrls(assetLoader), assetLoader.getPublicURL('main.js')]
  }

  options.scripts.forEach((script) => {
    response.locals.assets.resourceHints.add(script)
  })

  try {
    response.render('home.hbs', options)
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
    response.status(500).send('Oh no, something went wrong!')
  }
}
