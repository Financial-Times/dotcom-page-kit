const ftCss = require('@financial-times/anvil-plugin-ft-css')

module.exports = {
  plugins: [
    ftCss.plugin()
  ],
  settings: {
    build: {
      entry: {
        styles: './src/main.scss'
      }
    }
  }
}
