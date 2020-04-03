const path = require('path')
const { PageKitBasePlugin } = require('@financial-times/dotcom-build-base')
const { PageKitJsPlugin } = require('@financial-times/dotcom-build-js')

module.exports = {
  entry: {
    scripts: './client/main.js'
  },
  output: {
    publicPath: '/public/'
  },
  plugins: [new PageKitBasePlugin(), new PageKitJsPlugin()]
}
