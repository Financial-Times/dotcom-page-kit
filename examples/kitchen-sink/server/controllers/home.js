const React = require('react')
const ReactDOM = require('react-dom/server')
const { DataEmbed } = require('@financial-times/dotcom-ui-data-embed')
const { Shell } = require('@financial-times/dotcom-ui-shell')
const { Layout } = require('@financial-times/dotcom-ui-layout')
const { Slot, AdsOptionsEmbed } = require('@financial-times/n-ads')

const { DATA_EMBED_ID } = require('../../constants.js')

module.exports = (_, response, next) => {
  try {
    const flags = { ads: true, tracking: true }
    const { appContext, assetLoader, embeddedData } = response.locals
    const styleBundles = [
      ...assetLoader.getStylesheetURLsFor('page-kit-layout-styles'),
      ...assetLoader.getStylesheetURLsFor('styles')
    ]
    const asyncStyleBundles = assetLoader.getStylesheetURLsFor('async')
    const scriptBundles = assetLoader.getScriptURLsFor('scripts')

    const adOptions = {
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
      }
    }

    const Page = () => (
      <Shell
        flags={flags}
        pageTitle="Hello World"
        scripts={scriptBundles}
        stylesheets={styleBundles}
        asyncStylesheets={asyncStyleBundles}
        systemCode="page-kit"
        appContext={appContext.data}
      >
        <AdsOptionsEmbed {...adOptions} />
        <Layout navigationData={response.locals.navigation} headerBefore={<Slot {...adSlotProps} />}>
          <div className="content">
            <div align="center">
              <p className="hello">Hello, welcome to Page Kit.</p>
            </div>
            <div>
              <p>
                The aim of this project is to provide a high quality, well tested, and thoroughly documented
                set of tools for assembling and delivering modern websites with Node.js based upon the best
                industry standards.
              </p>
            </div>
            <section className="asynchronous-example">
              <h3>A note on asynchronous CSS</h3>
              <p>
                The CSS for this section was loaded asynchonously; that is, the stylesheet didn't block the
                browser from rendering while it loaded.{' '}
                <a href="https://github.com/Financial-Times/dotcom-page-kit/blob/HEAD/packages/dotcom-ui-shell/README.md">
                  See the README for details
                </a>
                .
              </p>
            </section>
          </div>
        </Layout>
        <DataEmbed id={DATA_EMBED_ID} data={embeddedData} />
      </Shell>
    )

    response.send('<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(<Page />))
  } catch (error) {
    next(error)
  }
}
