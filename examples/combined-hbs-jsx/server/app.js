import { PageKitHandlebars, helpers } from '@financial-times/dotcom-server-handlebars'
import { PageKitReactJSX } from '@financial-times/dotcom-server-react-jsx'
import express from 'express'

import hbsToJsxController from './controllers/hbs-to-jsx'
import jsxToHbsController from './controllers/jsx-to-hbs'
import loadJsxComponent from './lib/handlebars-helpers/load-jsx-component'

export const app = express()

// Add Handlebars as a view engine so controllers may use response.render()
const hbsRenderer = new PageKitHandlebars({
  cache: process.env.NODE_ENV === 'production',
  helpers: {
    ...helpers,
    loadJsxComponent
  }
})

// Add React as a view engine so controllers may use response.render()
const jsxRenderer = new PageKitReactJSX({ useStaticRendering: true })

app.engine('.hbs', hbsRenderer.engine)
app.engine('.jsx', jsxRenderer.engine)

app.get('/hbs-to-jsx', hbsToJsxController)
app.get('/jsx-to-hbs', jsxToHbsController)
