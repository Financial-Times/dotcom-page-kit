const sass = require('@financial-times/anvil-plugin-sass')

module.exports = {
  plugins: [
    sass.plugin()
  ],
  settings: {
    build: {
      entry: {
        styles: './src/main.scss'
      }
    }
  }
}
