const sass = require('@financial-times/anvil-plugin-sass')

module.exports = {
  plugins: [
    sass.plugin(),
    customDebugPlugin,
  ],
  settings: {
    build: {
      entry: {
        styles: './src/main.scss'
      }
    }
  }
}

function customDebugPlugin ({ on }) {
  on('webpackConfig', ({ resource: webpackConfig }) => {
    console.dir(webpackConfig, { depth: Infinity }) // eslint-disable-line no-console
  })
}
