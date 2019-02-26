const esnext = require('@financial-times/anvil-plugin-esnext')

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
