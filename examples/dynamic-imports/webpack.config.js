const path = require('path')
const pageKitConfig = require('@financial-times/dotcom-build-webpack-config')
const js = require('@financial-times/dotcom-build-js')

module.exports = {
  entry: {
    scripts: './client/main.js'
  },
  output: {
    publicPath: '/public/'
  },
  plugins: [
    pageKitConfig.plugin(),
    js.plugin()
  ]
}
