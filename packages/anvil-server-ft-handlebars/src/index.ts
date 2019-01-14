import handlebars from 'express-handlebars'
import handlebarsHelpers from '@financial-times/n-handlebars/src/extend-helpers'

export interface Options {
  /** Defaults to current working directory */
  directory: string
  /** File name for the default layout template, defaults to "main" */
  defaultLayout: string | boolean
  /** Template file name extension, defaults to ".html" */
  extname: string
  /** Path to view templates, defaults to "views" */
  viewsDirectory: string
  /** Path to layout templates, defaults to "views/layouts" */
  layoutsDir: string
  /** List of paths to lookup partial template files on startup, defaults to ["views/partials", "bower_components", "node_modules/@financial-times"] */
  partialsDir: string[]
  /** Helper functions to register with the Handlebars instance */
  helpers: { [key: string]: Function }
}

const defaultOptions: Options = {
  directory: process.cwd(),
  defaultLayout: null,
  extname: '.html',
  viewsDirectory: 'views',
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
