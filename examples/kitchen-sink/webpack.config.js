const path = require('path')
const { PageKitBasePlugin } = require('@financial-times/dotcom-build-base')
const { PageKitCodeSplittingPlugin } = require('@financial-times/dotcom-build-code-splitting')
const { PageKitBowerResolvePlugin } = require('@financial-times/dotcom-build-bower-resolve')
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
    new PageKitBowerResolvePlugin(),
    new PageKitSassPlugin({
      // Enabling webpackImporter because Sass itself can only resolve partial files based on the
      // CWD and not relative to the current file being processed. This means Sass can't find the
      // nested dependencies created when symlinking.
      webpackImporter: true,
      includePaths: [
        // All Bower components are installed at the repo root
        path.resolve('../../bower_components')
      ]
    })
  ],
}
