const js = require('@financial-times/anvil-plugin-ft-js')
const bower = require('@financial-times/anvil-plugin-bower-resolve');
const bundleSplitting = require('@financial-times/anvil-plugin-ft-js-code-splitting')

module.exports = {
  plugins: [
    js.plugin(),
    bundleSplitting.plugin(),
    bower.plugin()
  ],
  settings: {
    build: {
      entry: {
        a: './client/a.js',
        b: './client/b.js'
      }
    }
  }
}
