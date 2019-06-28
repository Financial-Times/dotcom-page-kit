const path = require('path')
const codeSplitting = require('@financial-times/anvil-build-ft-js-code-splitting')
const bower = require('@financial-times/anvil-build-bower-resolve')
const sass = require('@financial-times/anvil-build-sass')
const js = require('@financial-times/anvil-build-ft-js')

module.exports = {
  plugins: [
    resolveBowerFromRoot,
    codeSplitting.plugin(),
    bower.plugin(),
    sass.plugin(),
    js.plugin(),
  ],
  settings: {
    build: {
      entry: {
        scripts: './client/main.js',
        styles: './client/main.scss'
      },
      outputPath: path.resolve('./public')
    }
  }
}

// HACK: This is intended only for this example app as all Bower components should be
// installed at the top-level of the repository.
function resolveBowerFromRoot({ on }) {
  on(sass.hooks.WEBPACK_SASS_LOADER_OPTIONS, ({ resource }) => {
    const path = require('path')
    resource.includePaths.push(path.resolve('../../bower_components'))
  })
}
