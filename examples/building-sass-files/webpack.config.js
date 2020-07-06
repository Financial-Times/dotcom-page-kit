const { PageKitBasePlugin } = require('@financial-times/dotcom-build-base')
const { PageKitSassPlugin } = require('@financial-times/dotcom-build-sass')

module.exports = {
  entry: {
    styles: './src/main.scss'
  },
  plugins: [
    new PageKitBasePlugin(),
    new PageKitSassPlugin({ prependData: '.prepended-flag-exists::after { content: "true"; }' })
  ]
}
