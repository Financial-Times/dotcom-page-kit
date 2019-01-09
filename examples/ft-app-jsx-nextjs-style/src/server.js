import path from 'path'
import express from 'express'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import { renderToString } from 'react-dom/server'
import AssetLoader from '@financial-times/anvil-server-asset-loader'
import { createRenderController } from '@financial-times/anvil-server-jsx-renderer/express'

export const app = express()

const assets = new AssetLoader({
  fileSystemPath: './dist',
  publicPath: '/assets'
})

const scriptsToLoad = [assets.getPublicURL('client.js'), assets.getPublicURL('runtime.js')]

const render = createRenderController({ renderFn: renderToString, scriptsToLoad })

app.use('/assets', express.static(path.resolve('./dist')))

app.get('/', render(HomePage))
app.get('/about', render(AboutPage))
