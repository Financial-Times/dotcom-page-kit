// This configuration extends the existing Storybook Webpack config.
// See https://storybook.js.org/configurations/custom-webpack-config/ for more info.

const excludePaths = [/node_modules/, /dist/]

module.exports = (baseConfig) => {
  // Use real file paths for symlinked dependencies do avoid including them multiple times
  baseConfig.resolve.symlinks = true

  // Resolve packages installed using Bower
  Object.assign(baseConfig.resolve, {
    modules: ['bower_components', 'node_modules'],
    descriptionFiles: ['bower.json', 'package.json'],
    mainFields: ['browser', 'module', 'main'],
    mainFiles: ['index', 'main']
  })

  // HACK: extend existing JS rule to ensure all dependencies are correctly ignored
  // https://github.com/storybooks/storybook/issues/3346#issuecomment-459439438
  const jsRule = baseConfig.module.rules.find((rule) => rule.test.test('.jsx'))
  jsRule.exclude = excludePaths

  // Add support for TypeScript source code
  // https://storybook.js.org/configurations/typescript-config/
  baseConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]]
    },
    exclude: excludePaths
  })

  baseConfig.resolve.extensions.push('.ts', '.tsx')

  // Add support for styles written with Sass
  baseConfig.module.rules.push({
    test: /\.(scss|sass)$/,
    resolve: {
      extensions: ['.scss', '.sass']
    },
    use: [
      {
        loader: require.resolve('style-loader')
      },
      {
        loader: require.resolve('css-loader')
      },
      {
        loader: require.resolve('sass-loader'),
        options: {
          includePaths: ['bower_components', 'node_modules/@financial-times']
        }
      }
    ]
  })

  return baseConfig
}
