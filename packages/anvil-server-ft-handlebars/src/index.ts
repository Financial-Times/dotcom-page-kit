import path from 'path'
import handlebars from '@financial-times/n-handlebars'
import renderWithLayout, { RenderContext } from './renderWithLayout'

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
  /** List of paths to partial template files, defaults to ["views/partials"] */
  partialsDir: string[]
}

const defaults: Options = {
  directory: process.cwd(),
  defaultLayout: 'main',
  extname: '.html',
  viewsDirectory: 'views',
  layoutsDir: 'views/layouts',
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
    // the express-handlebars package will resolve views according an Express
    // application's "views" setting but this should not be provided to ensure
    // all views, layouts, and partials are resolved consistently.
    // <https://github.com/ericf/express-handlebars/blob/master/lib/express-handlebars.js#L186-L196>
    const fileName = view + this.options.extname
    const viewPath = path.join(this.options.directory, this.options.viewsDirectory, fileName)
    return this.startup.then((handlebars) => renderWithLayout(handlebars, viewPath, context))
  }
}

export default AnvilServerHandlebars
