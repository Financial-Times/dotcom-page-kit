import path from 'path'
import * as esbuild from 'esbuild'
import { clean } from 'esbuild-plugin-clean'
import { compress, CompressOptions } from 'esbuild-plugin-compress'
import assetsManifest from 'esbuild-plugin-assets-manifest'
import zlib from 'zlib'

export const pageKitBase: esbuild.Plugin = {
  name: '@dotcom-page-kit/base',
  setup(build) {
    const options = build.initialOptions
    const isDevMode = !options.minify

    const outputFileName = isDevMode ? '[name].bundle.js' : '[name].[hash].bundle.js'

    options.entryNames = outputFileName
    options.chunkNames = outputFileName
    options.outdir = path.resolve('esbuild-public')

    options.sourcemap = isDevMode ? 'inline' : 'linked'
  }
}

export const basePlugins = (isDev: boolean): esbuild.Plugin[] => {
  const cleanPluginOptions = { verbose: false }

  const compressionPluginOptions: CompressOptions = {
    gzip: true,
    gzipOptions: {
      level: 9
    },
    brotli: true,
    brotliOptions: {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY
      }
    },
    exclude: '*.!(js|css)'
  }

  const manifestPluginOptions = {
    filename: 'esbuild-assets.json'
  }

  const plugins = [clean(cleanPluginOptions), assetsManifest(manifestPluginOptions)]
  if (!isDev) {
    plugins.push(compress(compressionPluginOptions))
  }
  return plugins
}
