import React from 'react'
import ReactDOM from 'react-dom/server'
import { Shell } from '@financial-times/dotcom-ui-shell'
import { Layout } from '@financial-times/dotcom-ui-layout'

export function homeController(request, response, next) {
  const appContext = {
    appName: 'ft-ui',
    edition: response.locals.navigation.editions.current.id
  }

  const pageData = {
    title: 'Hello World!',
    contents: '<div align="center"><p>Hello, welcome to Page Kit.</p></div>'
  }

  const shellProps = {
    scripts: ['public/scripts.bundle.js'],
    stylesheets: ['public/shared-blocking-styles.css', 'public/shared-non-blocking-styles.css'],
    pageTitle: pageData.title,
    appContext: appContext
  }

  const userIsLoggedIn = request.query.userIsLoggedIn

  const layoutProps = {
    navigationData: response.locals.navigation,
    headerOptions: userIsLoggedIn
      ? { userIsAnonymous: false, userIsLoggedIn: true }
      : { userIsAnonymous: true, userIsLoggedIn: false }
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
