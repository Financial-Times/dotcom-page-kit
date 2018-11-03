import set from 'lodash.set'
import get from 'lodash.get'
import { Plugin } from 'adonai'
import BowerResolvePlugin from 'bower-resolve-webpack-plugin'

export default new Plugin(({ on }) => {
  on('@Build::amend::webpackConfig', amendWebpackConfig)
})

function amendWebpackConfig({ c, webpackConfig }) {
  const resolvePlugins = [new BowerResolvePlugin()]
  const config = {
    resolve: {
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

  Object.assign(webpackConfig, config)

  if (!get(webpackConfig, 'resolve.plugins')) {
    set(webpackConfig, 'resolve.plugins', [])
  }

  webpackConfig.resolve.plugins.push(...resolvePlugins)
}
