import mixinDeep from 'mixin-deep'
import Handlebars, { Template, HelperDelegate } from 'handlebars'
import loadPartialFiles, { TFilePaths } from './loadPartialFiles'

export type TRendererOptions = {
  /** Template file extension, defaults to .html */
  extension: string

  /** Extra Handlebars helper functions to register */
  helpers: {
    [key: string]: HelperDelegate
  }

  /** Preloaded partial templates */
  partials: {
    [key: string]: Template
  }

  partialFilePaths: TFilePaths
}

const defaultPartialFilePaths = {
  'views/partials': ['**/*'],
  bower_components: ['n-*/templates/**/*', 'n-*/components/**/*'],
  'node_modules/@financial-times': ['*/templates/**/*', '*/components/**/*']
}

const defaultOptions: TRendererOptions = {
  extension: '.html',
  helpers: {},
  partials: {},
  partialFilePaths: defaultPartialFilePaths
}

class HandlebarsRenderer {
  public options: TRendererOptions

  constructor(userOptions?: Partial<TRendererOptions>) {
    this.options = mixinDeep({}, defaultOptions, userOptions)

    const loadedPartials = loadPartialFiles(this.options.partialFilePaths, this.options.extension)

    Object.entries(loadedPartials).forEach(([name, partial]) => {
      Handlebars.registerPartial(name, partial)
    })

    Object.entries(this.options.partials).forEach(([name, partial]) => {
      Handlebars.registerPartial(name, partial)
    })

    Object.entries(this.options.helpers).forEach(([name, helper]) => {
      Handlebars.registerHelper(name, helper)
    })
  }
}

export default HandlebarsRenderer
