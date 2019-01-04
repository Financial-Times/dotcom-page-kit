import path from 'path'
import express from 'express'
import { homePageController } from './controllers/home'
import { aboutPageController } from './controllers/about'
import AssetLoader from '@financial-times/anvil-server-asset-loader'
import { createRendererMiddleware } from '@financial-times/anvil-server-jsx-renderer/express'

export const app = express()

const assets = new AssetLoader({
  fileSystemPath: './dist',
  publicPath: '/assets'
})

const scriptsToLoad = [assets.getPublicPath('client.js'), assets.getPublicPath('runtime.js')]

const renderer = createRendererMiddleware({ scriptsToLoad })

app.use(renderer)
app.use('/assets', express.static(path.resolve('./dist')))

app.get('/', homePageController)
app.get('/about', aboutPageController)
