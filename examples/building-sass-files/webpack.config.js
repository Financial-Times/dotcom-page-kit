const { PageKitBasePlugin } = require('@financial-times/dotcom-build-base')
const { PageKitSassPlugin } = require('@financial-times/dotcom-build-sass')

module.exports = {
  entry: {
    styles: './src/main.scss'
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new PageKitBasePlugin(),
    new PageKitSassPlugin({ additionalData: '.prepended-flag-exists::after { content: "true"; }' })
  ]
}
