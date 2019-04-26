const js = require('@financial-times/anvil-plugin-ft-js')
const bower = require('@financial-times/anvil-plugin-bower-resolve');
const bundleSplitting = require('@financial-times/anvil-plugin-ft-js-bundle-splitting')

module.exports = {
  plugins: [
    customManifestPlugin,
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

function customManifestPlugin({ on }) {
  on('webpackConfig', ({ resource }) => {
    const WebpackAssetsManifest = require('webpack-assets-manifest')

    resource.plugins.push(new WebpackAssetsManifest({
      integrity: false,
      entrypoints: true,
      output: 'test.json'
    }))
  })
}
