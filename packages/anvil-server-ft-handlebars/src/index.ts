import handlebars from 'express-handlebars'
import handlebarsHelpers from '@financial-times/n-handlebars/src/extend-helpers'

interface Options {
  /** File name for the default layout template. Defaults to null */
  defaultLayout: string | boolean
  /** Template file name extension. Defaults to ".hbs" */
  extname: string
  /** Path to a directory containing layout template files. Defaults to "views/layouts" */
  layoutsDir: string
  /** An array of paths to lookup partial template files. Defaults to ["views/partials", "bower_components", "node_modules/@financial-times"] */
  partialsDir: string[]
  /** An object of additional helper functions to register with Handlebars. Defaults to {}. */
  helpers: { [key: string]: Function }
}

const defaultOptions: Options = {
  defaultLayout: null,
  extname: '.hbs',
  layoutsDir: 'views/layouts',
  partialsDir: ['views/partials', 'bower_components', 'node_modules/@financial-times'],
  helpers: {}
}

export function create(userOptions: Partial<Options>) {
  const options = { ...defaultOptions, ...userOptions }
  handlebarsHelpers(options.helpers)
  return handlebars.create(options)
}

export function engine(userOptions: Partial<Options>) {
  return create(userOptions).engine
}
