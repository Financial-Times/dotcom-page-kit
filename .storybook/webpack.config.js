// This configuration extends the existing Storybook Webpack config.
// See https://storybook.js.org/configurations/custom-webpack-config/ for more info.

const excludePaths = [/node_modules/, /dist/]

module.exports = ({ config }) => {
  // Use real file paths for symlinked dependencies do avoid including them multiple times
  config.resolve.symlinks = true

  Object.assign(config.resolve, {
    modules: ['node_modules'],
    descriptionFiles: ['package.json'],
    mainFiles: ['index', 'main']
  })

  // HACK: extend existing JS rule to ensure all dependencies are correctly ignored
  // https://github.com/storybooks/storybook/issues/3346#issuecomment-459439438
  const jsRule = config.module.rules.find((rule) => rule.test.test('.jsx'))
  jsRule.exclude = excludePaths

  // HACK: Instruct Babel to check module type before injecting Core JS polyfills
  // https://github.com/i-like-robots/broken-webpack-bundle-test-case
  const babelConfig = jsRule.use.find(({ loader }) => loader === 'babel-loader') || {
    options: { presets: [] }
  }
  babelConfig.options.sourceType = 'unambiguous'

  // Add support for TypeScript source code
  // https://storybook.js.org/configurations/typescript-config/
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [require.resolve('@babel/preset-react'), require.resolve('@babel/preset-typescript')]
    },
    exclude: excludePaths
  })

  config.resolve.extensions.push('.ts', '.tsx', '.d.ts')

  // Add support for styles written with Sass
  config.module.rules.push({
    test: /\.(scss|sass)$/,
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
          // Use `dart-sass` rather than `node-sass`
          implementation: require('sass'),
          sassOptions: {
            includePaths: ['node_modules']
          }
        }
      }
    ]
  })

  // HACK: Ensure we only bundle one instance of React
  config.resolve.alias.react = require.resolve('react')

  return config
}
