import express from 'express'
import { homePageController } from './controllers/home'
import AnvilReact from '@financial-times/anvil-server-react'

export const app = express()

app.locals.siteName = 'Good Cats'

// Add React as a view engine so controllers may use response.render()
const react = new AnvilReact({ useStaticRendering: true })
app.engine('.jsx', react.engine)

app.use('/public', express.static('./public'))

app.get('/', homePageController)
