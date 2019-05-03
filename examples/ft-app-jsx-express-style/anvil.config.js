const css = require('@financial-times/anvil-plugin-css')
const ftJs = require('@financial-times/anvil-plugin-ft-js')
const sass = require('@financial-times/anvil-plugin-sass')
const bundleSplitting = require('@financial-times/anvil-plugin-ft-js-bundle-splitting')

module.exports = {
  plugins: [
    bundleSplitting.plugin(),
    css.plugin(),
    sass.plugin(),
    ftJs.plugin({
      jsxPragma: 'React.createElement',
      jsxPragmaFrag: 'React.Fragment'
    })
  ],
  settings: {
    build: {
      entry: {
        styles: './client/styles/main.css',
        sass: './client/sass/main.scss',
        client: './client/index.js'
      }
    }
  }
}
