const ftJs = require('@financial-times/anvil-plugin-ft-js')
const ftCss = require('@financial-times/anvil-plugin-ft-css')

module.exports = {
  plugins: [
    ftJs.plugin(),
    ftCss.plugin()
  ],
  settings: {
    build: {
      entry: {
        main: './client/main.js'
      }
    }
  }
}
