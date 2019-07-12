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
        styles: './client/main.scss'
      },
      outputPath: path.resolve('./public')
    }
  }
}
