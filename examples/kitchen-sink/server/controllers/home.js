const React = require('react')
const ReactDOM = require('react-dom/server')
const polyfills = require('@financial-times/anvil-ui-ft-polyfills')
const { Shell } = require('@financial-times/anvil-ui-ft-shell')
const { Layout } = require('@financial-times/anvil-ui-ft-layout')
const { Slot, AdsOptionsEmbed } = require('@financial-times/n-ads')

module.exports = (_, response, next) => {
  try {
    const flags = { ads: true, tracking: true }
    const appContext = response.locals.appContext
    const styleBundles = response.locals.assets.loader.getStylesheetURLsFor('styles')
    const scriptBundles = response.locals.assets.loader.getScriptURLsFor('scripts')
    const enhancedScripts = [polyfills.enhanced, ...scriptBundles]
    const coreScripts = [polyfills.core]
    const forHints = [...enhancedScripts, ...styleBundles]

    forHints.forEach((file) => {
      response.locals.assets.resourceHints.add(file)
    })

    response.set('Link', response.locals.assets.resourceHints.toString())

    const adOptions = {
      ...appContext.data,
      dfp_site: 'ft.com',
      dfp_zone: 'Home/UK'
    }

    const adSlotProps = {
      name: 'leaderboard',
      formatSmall: false,
      formatsLarge: 'SuperLeaderboard,Leaderboard,Responsive',
      formatsExtra: 'Billboard,SuperLeaderboard,Leaderboard,Responsive',
      targeting: {
        pos: 'top'
      },
      style: {
        width: '100%',
        textAlign: 'center'
      }
    }

    const Page = () => (
      <Shell
        flags={flags}
        pageTitle="Hello World"
        coreScripts={coreScripts}
        stylesheets={styleBundles}
        enhancedScripts={enhancedScripts}
        context={appContext.data}>
        <AdsOptionsEmbed {...adOptions} />
        <Layout navigationData={response.locals.navigation} headerBefore={<Slot {...adSlotProps} />}>
          <div align="center">
            <p className="hello">Hello, welcome to Anvil.</p>
          </div>
        </Layout>
      </Shell>
    )

    response.send('<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(<Page />))
  } catch (error) {
    next(error)
  }
}
