const base = require('@financial-times/dotcom-build-base')
const sass = require('@financial-times/dotcom-build-sass')

module.exports = {
  entry: {
    styles: './src/main.scss'
  },
  plugins: [base.plugin(), sass.plugin()]
}
