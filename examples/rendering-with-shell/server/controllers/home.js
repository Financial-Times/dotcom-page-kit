import React from 'react'
import { Shell } from '@financial-times/dotcom-ui-shell'
import { renderToStaticMarkup } from 'react-dom/server'

export function homepageController(req, res) {
  const mainJsFilePath = res.locals.assets.loader.getPublicURL('main.js')
  const markup = renderToStaticMarkup(
    <Shell siteTitle="Page Kit" pageTitle="Shell example" enhancedScripts={[mainJsFilePath]}>
      <h1>Hello</h1>
      <button id="clickMeBtn">Click me</button>
    </Shell>
  )
  res.send(markup)
}
