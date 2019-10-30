const path = require('path')
const codeSplitting = require('@financial-times/dotcom-build-code-splitting')
const bower = require('@financial-times/dotcom-build-bower-resolve')
const sass = require('@financial-times/dotcom-build-sass')
const js = require('@financial-times/dotcom-build-js')

module.exports = {
  plugins: [
    codeSplitting.plugin(),
    bower.plugin(),
    sass.plugin({includePaths: [path.resolve('../../bower_components')]}),
    js.plugin(),
  ],
  settings: {
    build: {
      entry: {
        scripts: './client/main.js',
        styles: './client/main.scss',
        async: './client/async.scss',
        'shared-blocking-styles': '../../packages/dotcom-ui-layout/shared-blocking-styles.scss',
        'shared-non-blocking-styles': '../../packages/dotcom-ui-layout/shared-non-blocking-styles.scss'
      },
      outputPath: path.resolve('./public')
    }
  }
}
