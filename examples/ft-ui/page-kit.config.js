const path = require('path')
const bower = require('@financial-times/dotcom-build-bower-resolve')
const sass = require('@financial-times/dotcom-build-sass')
const js = require('@financial-times/dotcom-build-js')

module.exports = {
  plugins: [
    bower.plugin(),
    sass.plugin({ includePaths: [path.resolve('../../bower_components')] }),
    js.plugin(),
  ],
  settings: {
    build: {
      entry: {
        scripts: './client/main.js',
        styles: './client/main.scss',
        'page-kit-layout-styles': require.resolve('@financial-times/dotcom-ui-layout/styles.scss')
      },
      outputPath: path.resolve('./public')
    }
  }
}
