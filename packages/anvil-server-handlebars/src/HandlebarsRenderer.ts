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
  partials?: {
    [key: string]: TemplateDelegate
  }

  /**
   * A list of directories and patterns used to dynamically find and load partial template files.
   * @default { './views/partials': '**\/*.{hbs,html}' }
   */
  partialPaths?: TFilePaths

  /**
   * Enable caching of template files to reduce filesystem I/O
   * @default false
   */
  cache?: boolean
}

const defaultOptions: Partial<TOptions> = {
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

  constructor(userOptions: TOptions) {
    this.options = mixinDeep({}, defaultOptions, userOptions)

    this.options.handlebars.registerHelper(this.options.helpers)

    this.options.handlebars.registerPartial(this.options.partials)

    // Load all partial templates and register them ahead of time.
    // This is synchronous but should only happen once and take < 100ms.
    // Partials will be lazily compiled by Handlebars when used.
    const partialFiles = findPartialFiles(this.options.rootDirectory, this.options.partialPaths)

    Object.keys(partialFiles).forEach((partialName) => {
      const contents = this.loadTemplateFile(partialFiles[partialName])
      this.options.handlebars.registerPartial(partialName, contents)
    })
  }

  loadTemplateFile(templatePath: string): TemplateDelegate {
    let template = this.cache.get(templatePath)

    if (template === undefined) {
      const contents = loadFileContents(templatePath)
      template = this.options.handlebars.compile(contents)

      if (this.options.cache) {
        this.cache.set(templatePath, template)
      }
    }

    return template
  }

  render(templatePath: string, context: any): string {
    const view = this.loadTemplateFile(templatePath)
    const html = view(context)

    return html.trim()
  }

  renderView(templatePath: string, context: any, callback: RenderCallback): void {
    try {
      const html = this.render(templatePath, context)
      callback(null, html)
    } catch (error) {
      callback(error)
    }
  }
}

export default HandlebarsRenderer
