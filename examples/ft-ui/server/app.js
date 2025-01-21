import express from 'express'
import * as navigation from '@financial-times/dotcom-middleware-navigation'
import * as assets from '@financial-times/dotcom-middleware-asset-loader'
import { homeController } from './controllers/home.jsx'

export const app = express()

app.use(navigation.init())
app.use(assets.init({ hostStaticAssets: true }))

app.use('/public', express.static('./public'))

app.get('/', homeController)
