const ftJs = require('@financial-times/anvil-plugin-ft-js')
const ftCss = require('@financial-times/anvil-plugin-ft-css')
const codeSplitting = require('@financial-times/anvil-plugin-code-splitting')

module.exports = {
  plugins: [
    codeSplitting.plugin(),
    ftCss.plugin(),
    ftJs.plugin({
      jsxPragma: 'React.createElement',
      jsxPragmaFrag: 'React.Fragment'
    })
  ],
  settings: {
    build: {
      entry: {
        client: './src/client.js'
      }
    }
  }
}
