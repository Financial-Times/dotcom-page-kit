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
      algorithm: 'gzip',
      compressionOptions: { level: 9 },
      minRatio: 1
    }

    const brotliCompressionPluginOptions = {
      test: /\.(js|css)$/,
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

    compiler.options.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        // the default of `true` means imports in ESM modules must have a file extension,
        // which is correct per the spec. unfortunately there are quite a few packages
        // that output ESM with extensionless imports.
        fullySpecified: false
      }
    })

    new CleanWebpackPlugin(cleanWebpackPluginOptions).apply(compiler)
    new ManifestPlugin(manifestPluginOptions).apply(compiler)

    if (!isDevMode) {
      new CompressionPlugin(gzipCompressionPluginOptions).apply(compiler)
      new CompressionPlugin(brotliCompressionPluginOptions).apply(compiler)
    }
  }
}
