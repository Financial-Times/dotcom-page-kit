import merge from 'webpack-merge'
import { Plugin } from 'adonai'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { RunningWebpackContext } from '@financial-times/anvil-types-build'

export default new Plugin(({ on }) => {
  on('@Build::amend::webpackConfig', amendWebpackConfig)
})

// NOTE: Webpack needs to be installed in this package for things to work (though it is not explicitly referenced here)

function amendWebpackConfig(runningContext: RunningWebpackContext) {
  const { context, webpackConfig: baseConfig } = runningContext
  const isDevMode = context.flags.devMode
  const opts = {
    autoprefixer: {
      browsers: '> 1%, ie 11, bb 10',
      grid: true
    },
    miniCssExtractPlugin: {
      // only include content hash in filename when compiling production assets
      filename: isDevMode ? '[name].css' : '[name].[contenthash:12].css'
    }
  }
  const config = {
    plugins: [
      // Extracts CSS into separate, non-JS files
      // https://github.com/webpack-contrib/mini-css-extract-plugin
      new MiniCssExtractPlugin(opts.miniCssExtractPlugin)
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            // Extracts CSS into separate, non-JS files
            // https://github.com/webpack-contrib/mini-css-extract-plugin
            {
              loader: MiniCssExtractPlugin.loader,
              options: {}
            },
            // Add support for handling .css files
            // https://github.com/webpack-contrib/css-loader
            {
              loader: require.resolve('css-loader'),
              options: {
                // Disable Webpack from resolving @import because Sass should
                // have already resolved and concatenated these files.
                import: false,
                // Disable Webpack from resolving url() because we do not
                // currently use this functionality at all.
                url: false
              }
            },
            // Enable use of PostCSS for CSS postprocessing
            // https://github.com/postcss/postcss-loader
            {
              loader: require.resolve('postcss-loader'),
              options: {
                plugins: [
                  // Add vendor prefixes automatically using data from Can I Use
                  // https://github.com/postcss/autoprefixer
                  require('autoprefixer')(opts.autoprefixer),
                  // Ensure that the final result is as small as possible. This can
                  // de-duplicate rule-sets which is useful if $o-silent-mode is toggled.
                  // https://github.com/cssnano/cssnano
                  require('cssnano')
                ]
              }
            },
            // Enable use of Sass for CSS preprocessing
            // https://github.com/webpack-contrib/sass-loader
            {
              loader: require.resolve('sass-loader'),
              options: {
                // Disable formatting so that we don't spend time pretty printing
                outputStyle: 'compressed',
                // Enable Sass to @import source files from installed dependencies
                includePaths: ['bower_components', 'node_modules/@financial-times']
              }
            }
          ]
        }
      ]
    }
  }

  const scssRule = config.module.rules[0]

  context.amend('webpackConfig::scssRule', scssRule)
  context.amend('webpackConfig::scssRule::miniCssExtractLoader', scssRule.use[0])
  context.amend('webpackConfig::scssRule::cssLoader', scssRule.use[1])
  context.amend('webpackConfig::scssRule::postCssLoader', scssRule.use[2])
  context.amend('webpackConfig::scssRule::postCssLoader::autoprefixer::options', opts.autoprefixer)
  context.amend('webpackConfig::scssRule::sassLoader', scssRule.use[3])
  context.amend('webpackConfig::miniCssExtractPlugin::options', opts.miniCssExtractPlugin)

  runningContext.webpackConfig = merge.smart(baseConfig, config)
}
