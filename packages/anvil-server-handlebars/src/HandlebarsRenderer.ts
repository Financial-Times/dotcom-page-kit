import path from 'path'
import mixinDeep from 'mixin-deep'
import Handlebars, { HelperDelegate, TemplateDelegate } from 'handlebars'
import loadPartialFiles, { TFileGlobs } from './loadPartialFiles'
import loadFileContents from './loadFileContents'
import getPartialName from './getPartialName'
import { RenderCallback } from './types'

export type TOptions = {
  /** Current working directory - defaults to process.cwd() */
  rootDirectory: string

  /** Template file name extension. Defaults to ".html" */
  fileExtension: string

  /** Additional helper functions to register with Handlebars. Defaults to {}. */
  helpers: {
    [key: string]: HelperDelegate
  }

  /** Preloaded partial templates to register */
  partials: {
    [key: string]: TemplateDelegate
  }

  /** Path to a directory containing view template files. Defaults to "./views/" */
  viewDirectory: string

  /** Folders containing partial files to dynamically find and load */
  partialDirectories: TFileGlobs
}

const defaultOptions: TOptions = {
  rootDirectory: process.cwd(),
  fileExtension: '.html',
  helpers: {},
  partials: {},
  viewDirectory: './views',
  partialDirectories: {
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
      this.options.partialDirectories,
      this.options.fileExtension
    )

    Object.keys(partialFiles).forEach((relativePath) => {
      const partialPath = partialFiles[relativePath]
      const contents = loadFileContents(partialPath)
      const name = getPartialName(relativePath)

      Handlebars.registerPartial(name, contents)
    })
  }

  render(viewPath: string, context: any): string {
    if (!path.isAbsolute(viewPath)) {
      viewPath = path.resolve(this.options.rootDirectory, this.options.viewDirectory, viewPath)
    }

    if (!path.extname(viewPath)) {
      viewPath = viewPath + this.options.fileExtension
    }

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
