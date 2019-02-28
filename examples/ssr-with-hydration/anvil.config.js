const esnext = require('@financial-times/anvil-plugin-esnext')
const codeSplitting = require('@financial-times/anvil-plugin-code-splitting')

module.exports = {
  plugins: [
    esnext.plugin(),
    codeSplitting.plugin(),
    plugin
  ],
  settings: {
    build: {
      entry: {
        main: './app/client.js'
      }
    }
  }
}

function plugin({ on }) {
  on('webpackConfig', ({ resource: webpackConfig }) => {
    webpackConfig.output.publicPath = '/assets/'
  })
  on('babelConfig', ({ resource: babelConfig }) => {
    babelConfig.presets.push('@babel/preset-react')
  })
}
