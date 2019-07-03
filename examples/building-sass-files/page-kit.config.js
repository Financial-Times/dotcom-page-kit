const sass = require('@financial-times/dotcom-build-sass')

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
