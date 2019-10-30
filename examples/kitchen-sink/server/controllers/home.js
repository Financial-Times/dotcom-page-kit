const React = require('react')
const ReactDOM = require('react-dom/server')
const { Shell } = require('@financial-times/dotcom-ui-shell')
const { Layout } = require('@financial-times/dotcom-ui-layout')
const { Slot, AdsOptionsEmbed } = require('@financial-times/n-ads')

module.exports = (_, response, next) => {
  try {
    const flags = { ads: true, tracking: true }
    const appContext = response.locals.appContext
    const styleBundles = response.locals.assets.loader.getStylesheetURLsFor('styles')
    const sharedBlockingStylesBundles = response.locals.assets.loader.getStylesheetURLsFor(
      'shared-blocking-styles'
    )
    const stylsharedNonBlockingStylesBundles = response.locals.assets.loader.getStylesheetURLsFor(
      'shared-non-blocking-styles'
    )
    const scriptBundles = response.locals.assets.loader.getScriptURLsFor('scripts')
    const forHints = [
      ...scriptBundles,
      ...styleBundles,
      ...sharedBlockingStylesBundles,
      ...sharedNonBlockingStylesBundles
    ]

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
        scripts={scriptBundles}
        stylesheets={styleBundles}
        appContext={appContext.data}>
        <AdsOptionsEmbed {...adOptions} />
        <Layout navigationData={response.locals.navigation} headerBefore={<Slot {...adSlotProps} />}>
          <div align="center">
            <p className="hello">Hello, welcome to Page Kit.</p>
          </div>
          <div>
            <p className="project-aim">
              The aim of this project is to provide a high quality, well tested, and thoroughly documented set
              of tools for assembling and delivering modern websites with Node.js based upon the best industry
              standards.
            </p>
          </div>
        </Layout>
      </Shell>
    )

    response.send('<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(<Page />))
  } catch (error) {
    next(error)
  }
}
