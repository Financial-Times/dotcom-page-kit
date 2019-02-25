const ftJs = require('@financial-times/anvil-plugin-ft-js')
const sass = require('@financial-times/anvil-plugin-sass')

module.exports = {
  plugins: [
    ftJs.plugin(),
    sass.plugin()
  ],
  settings: {
    build: {
      entry: {
        main: './client/main.js'
      }
    }
  }
}
