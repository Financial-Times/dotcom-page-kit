import get from 'lodash.get'
import { hooks } from '../entities/hooks'
import { PageKitConfig } from '../types/PageKitConfig'
import { ConfigContext } from '../entities/ConfigContext'
import { getBabelConfig } from './getBabelConfig'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import ManifestPlugin from 'webpack-assets-manifest'

export function getWebpackConfig(baseConfig: PageKitConfig) {
  return function (_, argv) {
    const isDevMode = argv.mode === 'development'

    const { context, publish, config } = new ConfigContext({ config: baseConfig, isDevMode })

    const entryOptions = get(config, 'settings.build.entry')
    const outputPath = get(config, 'settings.build.outputPath')
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

    const manifestFileName = get(config, 'settings.build.manifestFileName') || 'manifest.json'
    const manifestPluginOptions = {
      output: manifestFileName,
      entrypoints: true
    }

    publish(hooks.WEBPACK_CLEAN_PLUGIN_OPTIONS, cleanWebpackPluginOptions)
    publish(hooks.WEBPACK_GZIP_COMPRESSION_PLUGIN_OPTIONS, gzipCompressionPluginOptions)
    publish(hooks.WEBPACK_BROTLI_COMPRESSION_PLUGIN_OPTIONS, brotliCompressionPluginOptions)
    publish(hooks.WEBPACK_MANIFEST_PLUGIN_OPTIONS, manifestPluginOptions)

    return publish(hooks.WEBPACK_CONFIG, {
      entry: entryOptions,
      output: {
        filename: outputFileName,
        chunkFilename: outputFileName,
        path: outputPath
      },
      resolve: {
        extensions: ['.js', '.jsx', '.mjs', '.json']
      },
      module: {
        rules: [
          publish(hooks.WEBPACK_JS_RULE, {
            test: [/\.(js|jsx|mjs)$/],
            // NOTE: Do not exclude bower_components or node_modules directories
            // https://github.com/Financial-Times/dotcom-page-kit/issues/366
            exclude: [],
            use: {
              loader: require.resolve('babel-loader'),
              options: getBabelConfig(context)
            }
          })
        ]
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
    })
  }
}
