import path from 'path'
import React from 'react'
import { Shell } from '@financial-times/anvil-ui-ft-shell'
import * as polyfillService from '@financial-times/anvil-ui-ft-polyfills'
import routes from './routes'
import express from 'express'
import { AssetLoader } from '@financial-times/dotcom-server-asset-loader'
import { renderToString } from 'react-dom/server'
import { getInitialProps, getDependencies } from '../libs/ssr/server'

const app = express()
const port = 3000
const assets = new AssetLoader({
  publicPath: '/assets',
  fileSystemPath: path.resolve('./dist'),
  manifestFileName: 'manifest.json'
})

app.use('/assets', express.static(path.resolve('./dist')))

routes.forEach(async (route) => {
  app.get(route.path, async (req, res) => {
    const Page = (await route.component()).default
    const initialProps = await getInitialProps(Page, req)
    const dependencies = await getDependencies(Page)

    const props = {
      siteTitle: 'Anvil',
      pageTitle: Page.title,
      description: Page.description,
      initialProps: { $$page: route.name, ...initialProps },
      enhancedScripts: [polyfillService.enhanced, ...assets.getScriptURLsFor('main')]
    }

    const markup = renderToString(
      <Shell {...props}>
        <div id="app">
          <Page.component {...props.initialProps} {...dependencies} />
        </div>
      </Shell>
    )
    res.send(`<!DOCTYPE html>${markup}`)
  })
})

app.listen(port, () => {
  console.log(`Listening on PORT:${port}`) // eslint-disable-line no-console
})
