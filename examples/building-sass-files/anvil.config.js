const ftCssPlugin = require('@financial-times/anvil-plugin-ft-css').default

module.exports = {
  plugins: [ftCssPlugin],
  settings: {
    build: {
      entry: {
        styles: './src/main.scss'
      }
    }
  }
}
