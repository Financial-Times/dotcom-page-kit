import handlebars from 'express-handlebars'
import handlebarsHelpers from '@financial-times/n-handlebars/src/extend-helpers'
import render, { RenderContext } from './render'
import resolveViewFile from './resolveViewFile'

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
  cache: boolean
}

const defaults: Options = {
  directory: process.cwd(),
  defaultLayout: null,
  extname: '.html',
  viewsDirectory: 'views',
  layoutsDir: 'views/layouts',
  partialsDir: ['views/partials', 'bower_components', 'node_modules/@financial-times'],
  helpers: {},
  cache: true
}

export default class AnvilHandlebars {
  private options: Options
  private handlebars

  constructor(options: Partial<Options>) {
    this.options = { ...defaults, ...options }

    handlebarsHelpers(this.options.helpers)

    this.handlebars = handlebars.create(this.options)
  }

  render(view: string, context: RenderContext): Promise<string> {
    // If called via Express's `.render()` method then the absolute path to the
    // template will be resolved based on the "views" setting and registered engine.
    // <https://github.com/expressjs/express/blob/master/lib/view.js>
    const viewPath = resolveViewFile.call(this, view)
    // Enable caching to avoid looking up partials for each render. The partials
    // lookup can be very slow due to a generic glob pattern.
    return render(this.handlebars, viewPath, { ...context, cache: true })
  }
}
