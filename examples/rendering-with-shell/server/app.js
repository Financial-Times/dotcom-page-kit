import path from 'path'
import express from 'express'
import * as assetsMiddleware from '@financial-times/dotcom-middleware-assets'
import { homepageController } from './controllers/home'

const app = express()
const port = 3000

app.use(
  assetsMiddleware.init({
    publicPath: '/assets',
    fileSystemPath: path.resolve('./dist'),
    manifestFileName: 'manifest.json',
    hostStaticAssets: true
  })
)

app.get('/', homepageController)

app.listen(port, () => {
  console.log(`Listening on PORT:${port}`) // eslint-disable-line no-console
})
