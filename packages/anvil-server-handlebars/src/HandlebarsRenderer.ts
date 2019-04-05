import mixinDeep from 'mixin-deep'
import Handlebars, { HelperDelegate, TemplateDelegate } from 'handlebars'
import findPartialFiles, { TFilePaths } from './findPartialFiles'
import loadFileContents from './loadFileContents'
import { RenderCallback } from './types'

export type TOptions = {
  /**
   * Current working directory.
   * @default process.cwd()
   */
  rootDirectory: string

  /**
   * Additional helper functions to register with Handlebars
   * @default {}
   */
  helpers: {
    [key: string]: HelperDelegate
  }

  /**
   * Preloaded partial templates to register. Defaults to {}.
   * @default {}
   */
  partials: {
    [key: string]: TemplateDelegate
  }

  /**
   * Folders containing partial files to dynamically find and load.
   * @default { './views/partials': '**\/*' }
   */
  partialPaths: TFilePaths
}

const defaultOptions: TOptions = {
  rootDirectory: process.cwd(),
  helpers: {},
  partials: {},
  partialPaths: {
    './views/partials': '**/*.{hbs,html}',
    './bower_components': '*/{templates,components}/**/*{hbs,html}',
    './node_modules/@financial-times': '*/{templates,components}/**/*{hbs,html}'
  }
}

class HandlebarsRenderer {
  public options: TOptions
  private cache: Map<string, TemplateDelegate> = new Map()

  constructor(userOptions?: Partial<TOptions>) {
    this.options = mixinDeep({}, defaultOptions, userOptions)

    Handlebars.registerHelper(this.options.helpers)

    Handlebars.registerPartial(this.options.partials)

    // Load all partial templates and register them ahead of time.
    // This is synchronous but should only happen once and take < 100ms.
    // Partials will be lazily compiled by Handlebars when used.
    const partialFiles = findPartialFiles(this.options.rootDirectory, this.options.partialPaths)

    Object.keys(partialFiles).forEach((partialName) => {
      const contents = loadFileContents(partialFiles[partialName])
      Handlebars.registerPartial(partialName, contents)
    })
  }

  render(viewPath: string, context: any): string {
    if (!this.cache.has(viewPath)) {
      const contents = loadFileContents(viewPath)
      const template = Handlebars.compile(contents)

      this.cache.set(viewPath, template)
    }

    const view = this.cache.get(viewPath)
    const html = view(context)

    return html.trim()
  }

  renderView(viewPath: string, context: any, callback: RenderCallback): void {
    try {
      const html = this.render(viewPath, context)
      callback(null, html)
    } catch (error) {
      callback(error)
    }
  }
}

export default HandlebarsRenderer
