import mixinDeep from 'mixin-deep'
import Handlebars, { Template, HelperDelegate } from 'handlebars'
import loadPartialFiles, { TFilePaths } from './loadPartialFiles'
import loadFileContents from './loadFileContents'

export type TOptions = {
  /** Template file extension, defaults to .html */
  extension: string

  /** Handlebars helper functions to register */
  helpers: {
    [key: string]: HelperDelegate
  }

  /** Preloaded partial templates to register */
  partials: {
    [key: string]: Template
  }

  /** Folders containing partial files to dynamically find and load */
  partialDirGlobs: TFilePaths
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
  private cache = new Map()

  constructor(userOptions?: Partial<TOptions>) {
    this.options = mixinDeep({}, defaultOptions, userOptions)

    Object.entries(this.options.helpers).forEach(([name, helper]) => {
      Handlebars.registerHelper(name, helper)
    })

    Object.entries(this.options.partials).forEach(([name, partial]) => {
      Handlebars.registerPartial(name, partial)
    })

    const partials = loadPartialFiles(this.options.partialDirGlobs, this.options.extension)

    Object.entries(partials).forEach(([name, filePath]) => {
      const contents = loadFileContents(filePath)
      Handlebars.registerPartial(name, contents)
    })
  }
}

export default HandlebarsRenderer
