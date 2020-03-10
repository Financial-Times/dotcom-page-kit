const path = require('path')
const { getWebpackConfig } = require('@financial-times/dotcom-build-webpack-config')
const js = require('@financial-times/dotcom-build-js')

module.exports = getWebpackConfig(
  {
    entry: {
      scripts: './client/main.js'
    },
    output: {
      publicPath: '/public/'
    }
  },
  [js.plugin()]
)
