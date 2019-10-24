const path = require('path')
const js = require('@financial-times/dotcom-build-js')

module.exports = {
  plugins: [
    js.plugin(),
    plugin
  ],
  settings: {
    build: {
      entry: {
        scripts: './client/main.js'
      },
      outputPath: path.resolve('./public')
    }
  }
}

function plugin({ on }) {
  on('webpackConfig', ({ resource: webpackConfig }) => {
    webpackConfig.output.publicPath = '/public/'
  })
}
