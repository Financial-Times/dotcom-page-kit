const cssPlugin = require('@financial-times/anvil-plugin-css').default
const ftJsPlugin = require('@financial-times/anvil-plugin-ft-js').default
const ftCssPlugin = require('@financial-times/anvil-plugin-ft-css').default
const codeSplittingPlugin = require('@financial-times/anvil-plugin-code-splitting').default

module.exports = {
  plugins: [
    codeSplittingPlugin,
    cssPlugin,
    ftCssPlugin,
    ftJsPlugin({
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
