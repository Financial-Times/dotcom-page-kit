const ftJs = require('@financial-times/anvil-plugin-ft-js')
const sass = require('@financial-times/anvil-plugin-sass')
const codeSplitting = require('@financial-times/anvil-plugin-code-splitting')

module.exports = {
  plugins: [
    codeSplitting.plugin(),
    sass.plugin(),
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
