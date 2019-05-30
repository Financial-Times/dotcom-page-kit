import express from 'express'
import { homePageController } from './controllers/home'
import { aboutPageController } from './controllers/about'
// import AssetLoader from '@financial-times/anvil-server-asset-loader'
import AnvilReact from '@financial-times/anvil-server-react'

export const app = express()

// const assets = new AssetLoader({
//   fileSystemPath: './dist',
//   publicPath: '/assets'
// })

// const scriptsToLoad = [assets.getPublicURL('client.js'), assets.getPublicURL('runtime.js')]

const renderer = new AnvilReact({ useStaticRendering: true })

app.engine('.jsx', renderer.engine)

app.use('/assets', express.static('./dist'))

app.get('/', homePageController)
app.get('/about', aboutPageController)
