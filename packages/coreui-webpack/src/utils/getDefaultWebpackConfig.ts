import merge from 'lodash.merge'
import CleanWebpackPlugin from 'clean-webpack-plugin'

interface Args {
  srcFile: string
  outDir: string
  babelConfig: Object
  devMode: boolean
}

export function getDefaultWebpackConfig(a: Args) {
  // prettier-ignore
  const config = {
    mode: 'production',
    entry: a.srcFile,
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: a.outDir
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|mjs|ts|tsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: require.resolve('babel-loader'),
            options: a.babelConfig
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin([a.outDir], {
        root: process.cwd()
      })
    ]
  }

  if (a.devMode) {
    merge(config, {
      mode: 'development',
      devtool: 'inline-source-map'
    })
  }

  return config
}

// TODO: Pass in the working directory
// TODO: Make the options for CleanWebpackPlugin available to be amended
// TODO: Decide whether it will be better to use typescript-loader
// TODO: Add an example showing the use of a custom babelrc
