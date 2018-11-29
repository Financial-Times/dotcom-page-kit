import path from 'path'
import express from 'express'
import FTShell from '@financial-times/anvil-ui-ft-shell'
import { homePageController } from './controllers/home'
import { aboutPageController } from './controllers/about'
import { createRendererMiddleware } from '@financial-times/anvil-server-jsx-renderer/express'

export const app = express()
const renderer = createRendererMiddleware({
  shellComponent: FTShell,
  assetUrlPrefix: process.env.ASSET_URL_PREFIX,
  assetManifestPath: path.join(__dirname, '../dist/manifest.json')
})

app.use(renderer)
app.use('/assets', express.static(path.join(__dirname, '../dist')))

app.get('/', homePageController)
app.get('/about', aboutPageController)
