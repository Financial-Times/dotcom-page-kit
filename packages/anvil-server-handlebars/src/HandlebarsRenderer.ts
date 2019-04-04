import mixinDeep from 'mixin-deep'
import Handlebars, { HelperDelegate, TemplateDelegate } from 'handlebars'
import loadPartialFiles, { TFileGlobs } from './loadPartialFiles'
import loadFileContents from './loadFileContents'
import { RenderCallback } from './types'

export type TOptions = {
  /** Template file extension, defaults to .html */
  extension: string

  /** Handlebars helper functions to register */
  helpers: {
    [key: string]: HelperDelegate
  }

  /** Preloaded partial templates to register */
  partials: {
    [key: string]: TemplateDelegate
  }

  /** Folders containing partial files to dynamically find and load */
  partialDirGlobs: TFileGlobs
}

const defaultOptions: TOptions = {
  extension: '.html',
  helpers: {},
  partials: {},
  partialDirGlobs: {
    './views/partials': '**/*',
    './bower_components': 'n-*/{templates,components}/**/*',
    './node_modules/@financial-times': '*/{templates,components}/**/*'
  }
}

class HandlebarsRenderer {
  public options: TOptions
  private cache: Map<string, TemplateDelegate> = new Map()

  constructor(userOptions?: Partial<TOptions>) {
    this.options = mixinDeep({}, defaultOptions, userOptions)

    Handlebars.registerHelper(this.options.helpers)

    Handlebars.registerPartial(this.options.partials)

    // Load all partial templates and cache them ahead of time.
    // This is synchronous but should only happen once on app startup.
    // They will be lazily compiled by Handlebars when used.
    const partialFiles = loadPartialFiles(this.options.partialDirGlobs, this.options.extension)

    Object.entries(partialFiles).forEach(([name, filePath]) => {
      const template = loadFileContents(filePath)
      Handlebars.registerPartial(name, template)
    })
  }

  renderView(viewPath: string, context: any, callback: RenderCallback): void {
    try {
      if (!this.cache.has(viewPath)) {
        const contents = loadFileContents(viewPath)
        const template = Handlebars.compile(contents)

        this.cache.set(viewPath, template)
      }

      const view = this.cache.get(viewPath)
      const html = view(context)

      callback(null, html)
    } catch (error) {
      callback(error)
    }
  }
}

export default HandlebarsRenderer
