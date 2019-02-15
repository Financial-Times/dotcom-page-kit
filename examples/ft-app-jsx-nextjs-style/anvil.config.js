const ftJsPlugin = require('@financial-times/anvil-plugin-ft-js').default
const ftCssPlugin = require('@financial-times/anvil-plugin-ft-css').default
const codeSplittingPlugin = require('@financial-times/anvil-plugin-code-splitting').default

module.exports = {
  plugins: [
    codeSplittingPlugin,
    ftCssPlugin,
    ftJsPlugin({
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
