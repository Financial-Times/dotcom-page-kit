import React from 'react'
import { Shell } from '@financial-times/anvil-ui-ft-shell'
import { renderToStaticMarkup } from 'react-dom/server'

export function homepageController(req, res) {
  const mainJsFilePath = res.locals.assets.loader.getPublicURL('main.js')
  const markup = renderToStaticMarkup(
    <Shell siteTitle="Anvil" pageTitle="Shell example" enhancedScripts={[mainJsFilePath]}>
      <h1>Hello</h1>
      <button id="clickMeBtn">Click me</button>
    </Shell>
  )
  res.send(markup)
}
