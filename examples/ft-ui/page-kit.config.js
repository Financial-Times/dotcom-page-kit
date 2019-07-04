const path = require('path')
const bower = require('@financial-times/dotcom-build-bower-resolve')
const sass = require('@financial-times/dotcom-build-sass')
const js = require('@financial-times/dotcom-build-js')

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