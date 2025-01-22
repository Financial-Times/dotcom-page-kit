const path = require('path')
const { PageKitBasePlugin } = require('@financial-times/dotcom-build-base')
const { PageKitSassPlugin } = require('@financial-times/dotcom-build-sass')
const { PageKitJsPlugin } = require('@financial-times/dotcom-build-js')

module.exports = {
  entry: {
    scripts: './client/main.js',
    styles: './client/main.scss',
    'page-kit-layout-styles': require.resolve('@financial-times/dotcom-ui-layout/styles.scss')
  },
  plugins: [new PageKitBasePlugin(), new PageKitJsPlugin(), new PageKitSassPlugin()]
}
