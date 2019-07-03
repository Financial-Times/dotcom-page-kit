import React from 'react'
import ReactDOM from 'react-dom/server'
import { Shell } from '@financial-times/dotcom-ui-shell'
import { Layout } from '@financial-times/dotcom-ui-layout'
import * as polyfills from '@financial-times/dotcom-ui-polyfill-service'

export function homeController(_, response, next) {
  const appContext = {
    appName: 'ft-ui',
    edition: response.locals.navigation.editions.current.id
  }

  const pageData = {
    title: 'Hello World!',
    contents: '<div align="center"><p>Hello, welcome to Anvil.</p></div>'
  }

  const shellProps = {
    coreScripts: [polyfills.core],
    enhancedScripts: [polyfills.enhanced, 'public/scripts.bundle.js'],
    stylesheets: ['public/styles.css'],
    pageTitle: pageData.title,
    context: appContext
  }

  const layoutProps = {
    navigationData: response.locals.navigation
  }

  try {
    const document = (
      <Shell {...shellProps}>
        <Layout {...layoutProps} contents={pageData.contents} />
      </Shell>
    )

    response.send('<!DOCTYPE html>' + ReactDOM.renderToString(document))
  } catch (error) {
    next(error)
  }
}
