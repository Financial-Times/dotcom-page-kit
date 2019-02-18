const ftJsPlugin = require('@financial-times/anvil-plugin-ft-js').default
const ftCssPlugin = require('@financial-times/anvil-plugin-ft-css').default

module.exports = {
  plugins: [ftJsPlugin(), ftCssPlugin],
  settings: {
    build: {
      entry: {
        main: './client/main.js'
      }
    }
  }
}
