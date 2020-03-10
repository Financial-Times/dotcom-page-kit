const { getWebpackConfig } = require('@financial-times/dotcom-build-webpack-config')
const sass = require('@financial-times/dotcom-build-sass')

module.exports = getWebpackConfig(
  {
    entry: {
      styles: './src/main.scss'
    }
  },
  [sass.plugin()]
)
