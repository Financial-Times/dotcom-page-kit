const bower = require('@financial-times/anvil-plugin-bower-resolve')
const sass = require('@financial-times/anvil-plugin-sass')
const js = require('@financial-times/anvil-plugin-ft-js')

module.exports = {
  plugins: [
    resolveBowerFromRoot,
    bower.plugin(),
    sass.plugin(),
    js.plugin(),
  ],
  settings: {
    build: {
      entry: {
        client: './client/main.js',
        styles: './client/main.scss'
      }
    }
  }
}

// HACK: This is intended only for this example app as all Bower components should be
// installed at the top-level of the repository.
function resolveBowerFromRoot({ on }) {
  on(sass.hooks.SASS_LOADER_OPTIONS, ({ resource }) => {
    const path = require('path')
    resource.includePaths.push(path.resolve('../../bower_components'))
  })
}
