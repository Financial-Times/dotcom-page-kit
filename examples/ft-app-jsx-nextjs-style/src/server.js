import path from 'path'
import express from 'express'
import FTShell from '@financial-times/anvil-ui-ft-shell'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import { renderToString } from 'react-dom/server'
import { createRenderController } from '@financial-times/anvil-server-jsx-renderer/express'

export const app = express()

const render = createRenderController({
  renderFn: renderToString,
  shellComponent: FTShell,
  assetUrlPrefix: process.env.ASSET_URL_PREFIX,
  assetManifestPath: path.join(__dirname, '../dist/manifest.json'),
  hydratableOnClient: true
})

app.use('/assets', express.static(path.join(__dirname, '../dist')))

app.get('/', render(HomePage))
app.get('/about', render(AboutPage))
