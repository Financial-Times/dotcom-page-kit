// This configuration extends the existing Storybook Webpack config.
// See https://storybook.js.org/configurations/custom-webpack-config/ for more info.
// The default Webpack and Babel configs can be seen here:
// - https://github.com/storybooks/storybook/blob/release/4.2/lib/core/src/server/preview/preview-preset.js
// - https://github.com/storybooks/storybook/blob/release/4.2/lib/core/src/server/common/babel.js
module.exports = {
  resolve: {
    symlinks: false,
    extensions: ['.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [['react-app', { flow: false, typescript: true }]]
        }
      }
    ]
  }
}
