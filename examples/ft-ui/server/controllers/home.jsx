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
    stylesheets: ['public/page-kit-layout-styles.css', 'public/styles.css'],
    pageTitle: pageData.title,
    appContext: appContext,
    systemCode: 'page-kit'
  }

  const userIsLoggedIn = request.query.userIsLoggedIn
  const userIsSubscribed = request.query.userIsSubscribed === 'true'

  const layoutProps = {
    navigationData: response.locals.navigation,
    headerOptions: userIsLoggedIn
      ? { userIsAnonymous: false, userIsLoggedIn: true, userIsSubscribed }
      : { userIsAnonymous: true, userIsLoggedIn: false, userIsSubscribed }
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
