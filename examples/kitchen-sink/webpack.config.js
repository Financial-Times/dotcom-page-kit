const path = require('path')
const { PageKitBasePlugin } = require('@financial-times/dotcom-build-base')
const { PageKitCodeSplittingPlugin } = require('@financial-times/dotcom-build-code-splitting')
const { PageKitSassPlugin } = require('@financial-times/dotcom-build-sass')
const { PageKitJsPlugin } = require('@financial-times/dotcom-build-js')

module.exports = {
  entry: {
    scripts: './client/main.js',
    styles: './client/main.scss',
    async: './client/async.scss',
    'page-kit-layout-styles': require.resolve('@financial-times/dotcom-ui-layout/styles.scss')
  },
  plugins: [
    new PageKitBasePlugin(),
    new PageKitJsPlugin(),
    new PageKitCodeSplittingPlugin(),
    new PageKitSassPlugin()
  ]
}
