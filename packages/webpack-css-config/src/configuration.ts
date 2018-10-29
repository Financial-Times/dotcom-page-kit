import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export const configuration = {
  plugins: [
    // Extracts CSS into separate, non-JS files
    // https://github.com/webpack-contrib/mini-css-extract-plugin
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // Add support for handling .css files
          // https://github.com/webpack-contrib/css-loader
          {
            loader: require.resolve('css-loader'),
            options: {
              // Disable Webpack from resolving @import because Sass should
              // have already resolved and concatenated these files.
              import: false,
              // Disable Webpack from resolving url() because we do not
              // currently use this functionality.
              url: false
            }
          },
          // Enable use of PostCSS for CSS postprocessing
          // https://github.com/postcss/postcss-loader
          {
            loader: require.resolve('postcss-loader'),
            options: {
              plugins: [
                // Add vendor prefixes to rules by Can I Use
                // https://github.com/postcss/autoprefixer
                require('autoprefixer')({
                  // TODO: share this browserslist expression
                  browsers: '> 1%, ie 11, bb 10',
                  grid: true
                }),
                // Ensure that the final result is as small as possible
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
              // Enable Sass to @import source files from installed modules
              includePaths: ['bower_components', 'node_modules/@financial-times']
            }
          }
        ]
      }
    ]
  }
}
