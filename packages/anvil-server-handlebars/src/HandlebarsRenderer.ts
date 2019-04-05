import mixinDeep from 'mixin-deep'
import Handlebars, { HelperDelegate, TemplateDelegate } from 'handlebars'
import loadPartialFiles, { TFileGlobs } from './loadPartialFiles'
import loadFileContents from './loadFileContents'
import getPartialName from './getPartialName'
import { RenderCallback } from './types'

export type TOptions = {
  /** Current working directory - defaults to process.cwd() */
  rootDirectory: string

  /** Template file extension, defaults to ".html" */
  fileExtension: string

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
  rootDirectory: process.cwd(),
  fileExtension: '.html',
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

    // Load all partial templates and register them ahead of time.
    // This is synchronous but should only happen once and take < 100ms.
    // Partials will be lazily compiled by Handlebars when used.
    const partialFiles = loadPartialFiles(
      this.options.rootDirectory,
      this.options.partialDirGlobs,
      this.options.fileExtension
    )

    partialFiles.forEach((partialFile) => {
      const name = getPartialName(this.options.rootDirectory, partialFile)
      const contents = loadFileContents(partialFile)

      Handlebars.registerPartial(name, contents)
    })
  }

  render(viewPath: string, context: any): string {
    if (!this.cache.has(viewPath)) {
      const contents = loadFileContents(viewPath)
      const template = Handlebars.compile(contents)

      this.cache.set(viewPath, template)
    }

    const view = this.cache.get(viewPath)
    return view(context)
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
