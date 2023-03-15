import * as babel from '@babel/core'
import * as esbuild from 'esbuild'
import { promises as fs } from 'fs'
import getBabelConfig from './babel'
import { PluginOptions } from './types'

const defaultOptions: PluginOptions = {
  jsxPragma: 'h',
  jsxPragmaFrag: 'Fragment'
}

export const pageKitJS = (userOptions: PluginOptions): esbuild.Plugin => {
  const options = { ...defaultOptions, ...userOptions }
  const config = getBabelConfig(options)
  return {
    name: '@dotcom-page-kit/js',
    setup(build) {
      build.initialOptions.resolveExtensions = ['.js', '.jsx', '.mjs', '.json', '.ts', '.tsx']
      build.onLoad({ filter: /\.(js|jsx|mjs|ts|tsx)$/ }, async (args) => {
        const source = await fs.readFile(args.path, 'utf8')
        const transformed = await babel.transformAsync(source, { filename: args.path, ...config })
        return { contents: transformed.code }
      })
    }
  }
}
