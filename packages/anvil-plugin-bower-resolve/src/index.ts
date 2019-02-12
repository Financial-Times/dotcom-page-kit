import BowerResolvePlugin from 'bower-resolve-webpack-plugin'

export default ({ on }) => {
  on('webpackConfig', addAbilityToResolveBower)
}

function addAbilityToResolveBower() {
  return {
    resolve: {
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
