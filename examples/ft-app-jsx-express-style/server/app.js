import path from 'path'
import express from 'express'
import { homePageController } from './controllers/home'
import { aboutPageController } from './controllers/about'
import { createRendererMiddleware } from '@financial-times/anvil-server-jsx-renderer/express'

export const app = express()

const renderer = createRendererMiddleware({
  assetUrlPrefix: process.env.ASSET_URL_PREFIX || '/assets',
  assetManifestPath: path.join(__dirname, '../dist/manifest.json')
})

app.use(renderer)
app.use('/assets', express.static(path.join(__dirname, '../dist')))

app.get('/', homePageController)
app.get('/about', aboutPageController)
