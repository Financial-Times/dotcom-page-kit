const { PageKitBase } = require('@financial-times/dotcom-build-base')
const { PageKitSass } = require('@financial-times/dotcom-build-sass')

module.exports = {
  entry: {
    styles: './src/main.scss'
  },
  plugins: [new PageKitBase(), new PageKitSass()]
}
