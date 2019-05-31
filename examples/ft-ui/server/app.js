import express from 'express'
import * as navigation from '@financial-times/anvil-middleware-ft-navigation'
import { homeController } from './controllers/home.jsx'

export const app = express()

app.use(navigation.init())

app.use('/public', express.static('./public'))

app.get('/', homeController)
