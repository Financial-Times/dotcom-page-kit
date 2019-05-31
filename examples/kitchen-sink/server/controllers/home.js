const React = require('react')
const ReactDOM = require('react-dom/server')
const { Shell } = require('@financial-times/anvil-ui-ft-shell')
const { Layout } = require('@financial-times/anvil-ui-ft-layout')
const polyfills = require('@financial-times/anvil-ui-ft-polyfills')

module.exports = (_, response, next) => {
  try {
    const flags = { ads: true, tracking: true }
    const styleBundles = response.locals.assets.loader.getStylesheetURLsFor('styles')
    const scriptBundles = response.locals.assets.loader.getScriptURLsFor('scripts')
    const enhancedScripts = [polyfills.enhanced, ...scriptBundles]
    const coreScripts = [polyfills.core]
    const forHints = [...enhancedScripts, ...styleBundles]

    forHints.forEach((file) => {
      response.locals.assets.resourceHints.add(file)
    })

    response.set('Link', response.locals.assets.resourceHints.toString())

    const Page = () => (
      <Shell
        flags={flags}
        pageTitle="Hello World"
        coreScripts={coreScripts}
        stylesheets={styleBundles}
        enhancedScripts={enhancedScripts}>
        <Layout navigationData={response.locals.navigation}>
          <div align="center">
            <p>Hello, welcome to Anvil.</p>
          </div>
        </Layout>
      </Shell>
    )

    response.send('<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(<Page />))
  } catch (error) {
    next(error)
  }
}
