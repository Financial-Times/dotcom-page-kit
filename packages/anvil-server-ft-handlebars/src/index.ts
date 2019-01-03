import handlebars from 'express-handlebars'
import handlebarsHelpers from '@financial-times/n-handlebars/src/extend-helpers'
import renderWithLayout, { RenderContext } from './renderWithLayout'
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
  helpers?: { [key: string]: Function }
}

const defaults: Options = {
  directory: process.cwd(),
  defaultLayout: null,
  extname: '.html',
  viewsDirectory: 'views',
  helpers: {},
  layoutsDir: 'views/layouts',
  partialsDir: ['views/partials', 'bower_components', 'node_modules/@financial-times']
}

class AnvilServerHandlebars {
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

    return renderWithLayout(this.handlebars, viewPath, context)
  }
}

export default AnvilServerHandlebars
