import getBabelRule from './babel'
import { PluginOptions } from './types'
import type webpack from 'webpack'

const defaultOptions: PluginOptions = {
  jsxPragma: 'h',
  jsxPragmaFrag: 'Fragment'
}

export class PageKitJs {
  options: PluginOptions

  constructor(userOptions: PluginOptions = {}) {
    this.options = { ...defaultOptions, ...userOptions }
  }

  apply(compiler: webpack.Compiler) {
    compiler.options.resolve.extensions = ['.js', '.jsx', '.mjs', '.json', '.ts', '.tsx']
    compiler.options.module.rules.push(getBabelRule(this.options))
  }
}
