import path from 'path'
import mixinDeep from 'mixin-deep'
import Handlebars, { HelperDelegate, TemplateDelegate } from 'handlebars'
import findPartialFiles from './findPartialFiles'
import loadFileContents from './loadFileContents'
import { TRenderCallback, TPartialTemplates, TFilePaths } from './types'

export type TPageKitHandlebarsOptions = {
  /**
   * An instance of Handlebars to use.
   * @default require('handlebars')
   */
  handlebars?: typeof Handlebars

  /**
   * Current working directory.
   * @default process.cwd()
   */
  rootDirectory?: string

  /**
   * Additional helper functions to register with Handlebars.
   * @default {}
   */
  helpers?: {
    [key: string]: HelperDelegate
  }

  /**
   * Partial templates to register with Handlebars.
   * @default {}
   */
  partials?: TPartialTemplates

  /**
   * A list of directories and patterns used to dynamically find and load partial template files.
   * @default { './views/partials': '**\/*.{hbs,html}' }
   */
  partialPaths?: TFilePaths

  /**
   * Enable caching of template files to reduce filesystem I/O
   * @default process.env.NODE_ENV !== 'development
   */
  cache?: boolean
}

// By default NODE_ENV will be undefined so be explicit
const nodeEnv = process.env.NODE_ENV || 'development'

const defaultOptions: TPageKitHandlebarsOptions = {
  cache: nodeEnv !== 'development',
  rootDirectory: process.cwd(),
  helpers: {},
  partials: {},
  partialPaths: {
    './views/partials': '**/*.{hbs,html}',
    './bower_components': '*/{templates,components,partials}/**/*.{hbs,html}',
    './node_modules/@financial-times': '*/{templates,components,partials}/**/*.{hbs,html}'
  }
}

export class PageKitHandlebars {
  public options: TPageKitHandlebarsOptions
  public engine: this['renderView']

  private cache: Map<string, any> = new Map()

  constructor(userOptions: TPageKitHandlebarsOptions = {}) {
    this.options = mixinDeep({}, defaultOptions, userOptions)

    // Create a point for Express to mount as a view engine
    this.engine = this.renderView.bind(this)
  }

  loadPartials(): TPartialTemplates {
    let partials: TFilePaths = this.cache.get('__partials__')

    if (partials === undefined) {
      partials = findPartialFiles(this.options.rootDirectory, this.options.partialPaths)

      if (this.options.cache) {
        this.cache.set('__partials__', partials)
      }
    }

    const templates = {}

    Object.keys(partials).forEach((name) => {
      const filePath = partials[name]
      templates[name] = this.loadTemplate(filePath)
    })

    return templates
  }

  loadTemplate(filePath: string): TemplateDelegate {
    if (path.isAbsolute(filePath) === false) {
      filePath = path.resolve(this.options.rootDirectory, filePath)
    }

    let template: TemplateDelegate = this.cache.get(filePath)

    if (template === undefined) {
      const contents = loadFileContents(filePath)
      const hbs = this.options.handlebars || Handlebars

      template = hbs.compile(contents)

      if (this.options.cache) {
        this.cache.set(filePath, template)
      }
    }

    return template
  }

  render(template: string | TemplateDelegate, context: any): string {
    if (typeof template === 'string') {
      template = this.loadTemplate(template)
    }

    const html = template(context, {
      helpers: this.options.helpers,
      partials: { ...this.options.partials, ...this.loadPartials() }
    })

    return html.trim()
  }

  // This method is intended to be mounted by Express and used as a view engine.
  // <https://expressjs.com/en/guide/using-template-engines.html>
  renderView(templatePath: string, context: any, callback: TRenderCallback): void {
    try {
      const html = this.render(templatePath, context)
      callback(null, html)
    } catch (error) {
      callback(error)
    }
  }
}
