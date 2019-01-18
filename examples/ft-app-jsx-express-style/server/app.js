import express from 'express'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { homePageController } from './controllers/home'
import { aboutPageController } from './controllers/about'
// import AssetLoader from '@financial-times/anvil-server-asset-loader'
import { createViewEngine } from '@financial-times/anvil-server-jsx'

export const app = express()

// const assets = new AssetLoader({
//   fileSystemPath: './dist',
//   publicPath: '/assets'
// })

// const scriptsToLoad = [assets.getPublicURL('client.js'), assets.getPublicURL('runtime.js')]

app.engine('.jsx', createViewEngine({ createElement, renderToString }))

app.use('/assets', express.static('./dist'))

app.get('/', homePageController)
app.get('/about', aboutPageController)
