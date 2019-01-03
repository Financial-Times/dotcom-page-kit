import path from 'path'
import express from 'express'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import { renderToString } from 'react-dom/server'
import { createRenderController } from '@financial-times/anvil-server-jsx-renderer/express'

export const app = express()

const render = createRenderController({
  renderFn: renderToString,
  assetUrlPrefix: process.env.ASSET_URL_PREFIX || '/assets',
  assetManifestPath: path.resolve('./dist/manifest.json'),
})

app.use('/assets', express.static(path.resolve('./dist')))

app.get('/', render(HomePage))
app.get('/about', render(AboutPage))
