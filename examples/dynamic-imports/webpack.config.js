const path = require('path')
const base = require('@financial-times/dotcom-build-base')
const js = require('@financial-times/dotcom-build-js')

module.exports = {
  entry: {
    scripts: './client/main.js'
  },
  output: {
    publicPath: '/public/'
  },
  plugins: [base.plugin(), js.plugin()]
}
