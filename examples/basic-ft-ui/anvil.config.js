const bower = require('@financial-times/anvil-plugin-bower-resolve')
const sass = require('@financial-times/anvil-plugin-sass')
const js = require('@financial-times/anvil-plugin-ft-js')

module.exports = {
  plugins: [
    bower.plugin(),
    sass.plugin(),
    js.plugin(),
  ],
  settings: {
    build: {
      entry: {
        client: './client/main.js',
        styles: './client/main.scss'
      }
    }
  }
}
