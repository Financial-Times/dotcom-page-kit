import getBabelRule from './babel'
import { PluginOptions } from './types'
import type webpack from 'webpack'

const defaultOptions: PluginOptions = {
  jsxPragma: 'h',
  jsxPragmaFrag: 'Fragment'
}

export function plugin(userOptions: PluginOptions = {}) {
  const options = { ...defaultOptions, ...userOptions }

  return {
    apply(compiler: webpack.Compiler) {
      compiler.options.resolve.extensions = ['.js', '.jsx', '.mjs', '.json', '.ts', '.tsx']

      compiler.options.module.rules.push(getBabelRule(options))
    }
  }
}
