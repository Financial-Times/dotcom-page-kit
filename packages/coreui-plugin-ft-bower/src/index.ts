import merge from 'webpack-merge'
import { Plugin } from 'adonai'
import BowerResolvePlugin from 'bower-resolve-webpack-plugin'

export default new Plugin(({ on }) => {
  on('@Build::amend::webpackConfig', amendWebpackConfig)
})

function amendWebpackConfig(runnerContext) {
  const baseConfig = runnerContext.webpackConfig
  const config = {
    resolve: {
      plugins: [new BowerResolvePlugin()],
      // In which folders the resolver look for modules relative paths are
      // looked up in every parent folder (like node_modules) absolute
      // paths are looked up directly the order is respected
      modules: ['bower_components', 'node_modules'],

      // package description files
      descriptionFiles: ['bower.json', 'package.json'],

      // package.json / bower.json
      // fields for package resolution
      mainFields: ['browser', 'module', 'main'],

      // file names for directory resolution
      mainFiles: ['index', 'main']
    }
  }

  runnerContext.webpackContext = merge.strategy({ 'resolve.plugins': 'append' })(baseConfig, config)
}
