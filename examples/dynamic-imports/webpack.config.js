const path = require('path')
const { PageKitBase } = require('@financial-times/dotcom-build-base')
const { PageKitJs } = require('@financial-times/dotcom-build-js')

module.exports = {
  entry: {
    scripts: './client/main.js'
  },
  output: {
    publicPath: '/public/'
  },
  plugins: [new PageKitBase(), new PageKitJs()]
}
