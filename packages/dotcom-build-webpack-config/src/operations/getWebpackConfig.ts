import webpack from 'webpack'
import path from 'path'
import { Plugin } from '@financial-times/dotcom-page-kit-pluggable'
import { hooks } from '../entities/hooks'
import { ConfigContext } from '../entities/ConfigContext'
import merge from 'webpack-merge'

import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import ManifestPlugin from 'webpack-assets-manifest'

export function getWebpackConfig(userConfig: webpack.Configuration, plugins: Plugin[] = []) {
  return function (_, argv) {
    const isDevMode = argv.mode === 'development'

    const { publish } = new ConfigContext({ config: userConfig, isDevMode, plugins })

    const outputFileName = isDevMode ? '[name].bundle.js' : '[name].[contenthash:12].bundle.js'

    const cleanWebpackPluginOptions = { verbose: false }

    const gzipCompressionPluginOptions = {
      test: /\.(js|css)$/,
      filename: '[path].gz',
      algorithm: 'gzip',
      compressionOptions: { level: 9 },
      minRatio: 1
    }

    const brotliCompressionPluginOptions = {
      test: /\.(js|css)$/,
      filename: '[path].br',
      algorithm: 'brotliCompress',
      compressionOptions: { level: 11 },
      minRatio: 1
    }

    const manifestPluginOptions = {
      entrypoints: true
    }

    publish(hooks.WEBPACK_CLEAN_PLUGIN_OPTIONS, cleanWebpackPluginOptions)
    publish(hooks.WEBPACK_GZIP_COMPRESSION_PLUGIN_OPTIONS, gzipCompressionPluginOptions)
    publish(hooks.WEBPACK_BROTLI_COMPRESSION_PLUGIN_OPTIONS, brotliCompressionPluginOptions)
    publish(hooks.WEBPACK_MANIFEST_PLUGIN_OPTIONS, manifestPluginOptions)

    return publish(hooks.WEBPACK_CONFIG, merge({
      output: {
        filename: outputFileName,
        chunkFilename: outputFileName,
        path: path.resolve('public')
      },
      plugins: isDevMode
        ? [new CleanWebpackPlugin(cleanWebpackPluginOptions), new ManifestPlugin(manifestPluginOptions)]
        : [
            new CleanWebpackPlugin(cleanWebpackPluginOptions),
            new CompressionPlugin(gzipCompressionPluginOptions),
            new CompressionPlugin(brotliCompressionPluginOptions),
            new ManifestPlugin(manifestPluginOptions)
          ],
      devtool: isDevMode ? 'cheap-module-eval-source-map' : 'source-map',
      bail: isDevMode ? false : true
    }, userConfig))
  }
}
