import express from 'express'
import { homePageController } from './controllers/home'
import { aboutPageController } from './controllers/about'
// import AssetLoader from '@financial-times/anvil-server-asset-loader'
import ReactRenderer from '@financial-times/anvil-server-react-renderer'

export const app = express()

// const assets = new AssetLoader({
//   fileSystemPath: './dist',
//   publicPath: '/assets'
// })

// const scriptsToLoad = [assets.getPublicURL('client.js'), assets.getPublicURL('runtime.js')]

const renderer = new ReactRenderer()

app.engine('.jsx', renderer.engine)

app.use('/assets', express.static('./dist'))

app.get('/', homePageController)
app.get('/about', aboutPageController)
