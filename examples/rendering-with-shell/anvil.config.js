const esnext = require('@financial-times/anvil-build-esnext')

module.exports = {
  plugins: [
    esnext.plugin()
  ],
  settings: {
    build: {
      entry: {
        main: './client/main.js'
      }
    }
  }
}
