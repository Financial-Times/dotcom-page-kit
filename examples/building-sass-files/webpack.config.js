const pageKitConfig = require('@financial-times/dotcom-build-webpack-config')
const sass = require('@financial-times/dotcom-build-sass')

module.exports = {
  entry: {
    styles: './src/main.scss'
  },
  plugins: [
    pageKitConfig.plugin(),
    sass.plugin()
  ]
}
