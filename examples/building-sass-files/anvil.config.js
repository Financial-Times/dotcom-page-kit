const ftCssPlugin = require('@financial-times/anvil-plugin-ft-css').default

module.exports = {
  plugins: [ftCssPlugin],
  buildSettings: {
    entry: {
      styles: './src/main.scss'
    }
  }
}
