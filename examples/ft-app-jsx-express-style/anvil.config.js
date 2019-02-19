const css = require('@financial-times/anvil-plugin-css')
const ftJs = require('@financial-times/anvil-plugin-ft-js')
const ftCss = require('@financial-times/anvil-plugin-ft-css')
const codeSplitting = require('@financial-times/anvil-plugin-code-splitting')

module.exports = {
  plugins: [
    codeSplitting.plugin(),
    css.plugin(),
    ftCss.plugin(),
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
