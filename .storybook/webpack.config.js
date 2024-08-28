// This configuration extends the existing Storybook Webpack config.
// See https://storybook.js.org/configurations/custom-webpack-config/ for more info.

const excludePaths = [/dist/]

module.exports = ({ config }) => {
  // Use real file paths for symlinked dependencies do avoid including them multiple times
  config.resolve.symlinks = true

  Object.assign(config.resolve, {
    modules: ['node_modules'],
    descriptionFiles: ['package.json'],
    mainFiles: ['index', 'main']
  })

  // Separate rule for JavaScript Files
  config.module.rules.push({
    test: /\.(js|jsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-react')],
      plugins: [require.resolve('@babel/plugin-transform-optional-chaining')]
    },
    exclude: excludePaths
  })

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
