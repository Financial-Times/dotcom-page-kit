import type webpack from 'webpack'
import path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import ManifestPlugin from 'webpack-assets-manifest'

export class PageKitBasePlugin {
  apply(compiler: webpack.Compiler) {
    const isDevMode = compiler.options.mode === 'development'

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

    compiler.options.output = {
      ...compiler.options.output,
      filename: outputFileName,
      chunkFilename: outputFileName,
      path: path.resolve('public')
    }

    compiler.options.devtool = isDevMode ? 'cheap-module-eval-source-map' : 'source-map'

    compiler.options.bail = !isDevMode

    new CleanWebpackPlugin(cleanWebpackPluginOptions).apply(compiler)
    new ManifestPlugin(manifestPluginOptions).apply(compiler)

    if (!isDevMode) {
      new CompressionPlugin(gzipCompressionPluginOptions).apply(compiler)
      new CompressionPlugin(brotliCompressionPluginOptions).apply(compiler)
    }
  }
}
