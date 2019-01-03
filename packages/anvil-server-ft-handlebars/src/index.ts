import handlebars from '@financial-times/n-handlebars'
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
  /** List of paths to lookup partial template files on startup, defaults to ["views/partials", "node_modules/@financial-times"] */
  partialsDir: string[]
}

const defaults: Options = {
  directory: process.cwd(),
  defaultLayout: null,
  extname: '.html',
  viewsDirectory: 'views',
  layoutsDir: 'views/layouts',
  // NOTE: n-handlebars will load partials from `bower_components` by default
  partialsDir: ['views/partials', 'node_modules/@financial-times']
}

class AnvilServerHandlebars {
  private options: Options
  private startup: Promise<any>

  constructor(options: Partial<Options>) {
    this.options = { ...defaults, ...options }
    this.startup = handlebars.standalone(this.options)
  }

  render(view: string, context: RenderContext): Promise<string> {
    // If called via Express's `.render()` method then the absolute path to the
    // template will be resolved based on the "views" setting and registered engine.
    // <https://github.com/expressjs/express/blob/master/lib/view.js>
    const viewPath = resolveViewFile.call(this, view)

    return this.startup.then((handlebars) => renderWithLayout(handlebars, viewPath, context))
  }
}

export default AnvilServerHandlebars
