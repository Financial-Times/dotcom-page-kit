import BowerResolvePlugin from 'bower-resolve-webpack-plugin'
import type webpack from 'webpack'

export function plugin() {
  return {
    apply(compiler: webpack.Compiler) {
      compiler.options.resolve = {
        // This will find .js files if a bower.json specifies a list of "main" files
        plugins: [new BowerResolvePlugin()],
        // In which folders the resolver look for modules relative paths are
        // looked up in every parent folder (like node_modules) absolute
        // paths are looked up directly the order is respected
        modules: ['bower_components', 'node_modules'],

        // package description files
        descriptionFiles: ['bower.json', 'package.json'],

        // file names for directory resolution
        mainFiles: ['index', 'main']
      }
    }
  }
}
