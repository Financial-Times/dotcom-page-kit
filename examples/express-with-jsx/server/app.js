import express from 'express'
import { homePageController } from './controllers/home'
import { PageKitReactJSX } from '@financial-times/dotcom-server-react-jsx'

export const app = express()

app.locals.siteName = 'Good Cats'

// Add React as a view engine so controllers may use response.render()
const renderer = new PageKitReactJSX({ useStaticRendering: true })
app.engine('.jsx', renderer.engine)

app.use('/public', express.static('./public'))

app.get('/', homePageController)
