import React from 'react'
import ReactDOM from 'react-dom/server'
import { Shell } from '@financial-times/dotcom-ui-shell'
import { Layout } from '@financial-times/dotcom-ui-layout'

export function homeController(request, response, next) {
  const appContext = {
    appName: 'security-headers'
  }

  const pageData = {
    title: 'Hello World!',
    contents: '<div align="center"><p>Hello, welcome to Page Kit.</p></div>'
  }

  const shellProps = {
    scripts: ['public/scripts.bundle.js'],
    stylesheets: ['public/page-kit-layout-styles.css', 'public/styles.css'],
    pageTitle: pageData.title,
    appContext: appContext
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
