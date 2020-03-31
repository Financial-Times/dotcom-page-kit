const path = require('path')
const { PageKitBase } = require('@financial-times/dotcom-build-base')
const { PageKitBowerResolve } = require('@financial-times/dotcom-build-bower-resolve')
const { PageKitSass } = require('@financial-times/dotcom-build-sass')
const { PageKitJs } = require('@financial-times/dotcom-build-js')

module.exports = {
  entry: {
    scripts: './client/main.js',
    styles: './client/main.scss',
    'page-kit-layout-styles': require.resolve('@financial-times/dotcom-ui-layout/styles.scss')
  },
  plugins: [
    new PageKitBase(),
    new PageKitBowerResolve(),
    new PageKitSass({
      // Enabling webpackImporter because Sass itself can only resolve partial files based on the
      // CWD and not relative to the current file being processed. This means Sass can't find the
      // nested dependencies created when symlinking.
      webpackImporter: true,
      includePaths: [
        // All Bower components are installed at the repo root
        path.resolve('../../bower_components')
      ]
    }),
    new PageKitJs()
  ]
}
