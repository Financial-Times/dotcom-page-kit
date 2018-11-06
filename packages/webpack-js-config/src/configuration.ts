import BowerResolvePlugin from 'bower-resolve-webpack-plugin'

export interface Options {
  /** You can test your browserslist string at https://browserl.ist/ */
  browserslist?: string
  /** Replace the function used when compiling JSX expressions */
  jsxPragma?: string
  /** Replace the component used when compiling JSX fragments */
  jsxFragment?: string
}

const defaults: Options = {
  // TODO: share this browserslist expression
  browserslist: '> 1%, ie 11, bb 10',
  jsxPragma: 'h',
  jsxFragment: 'Fragment'
}

export function configuration(options: Options) {
  const opts = { ...defaults, ...options }

  return {
    output: {
      filename: '[name].[contenthash:12].js'
    },
    resolve: {
      plugins: [
        // Handle a Bower manifest specifying `main` as an array
        new BowerResolvePlugin()
      ],

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
      mainFiles: ['index', 'main'],

      // Automatically resolve these extensions.
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.json']
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          // Do not transpile any installed modules
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                cacheDirectory: true,
                plugins: [
                  // Enables the re-use of Babel helpers to save on codesize
                  // https://babeljs.io/docs/en/next/babel-plugin-transform-runtime.html
                  require.resolve('@babel/plugin-transform-runtime')
                ],
                presets: [
                  [
                    // Use the latest JavaScript without micromanaging which transforms to use
                    // https://babeljs.io/docs/en/next/babel-preset-env.html
                    require.resolve('@babel/preset-env'),
                    {
                      targets: opts.browserslist,
                      useBuiltIns: false
                    }
                  ],
                  [
                    // Support JSX syntax and React dev tools if required
                    // https://babeljs.io/docs/en/babel-preset-react
                    require.resolve('@babel/preset-react'),
                    {
                      pragma: opts.jsxPragma,
                      pragmaFrag: opts.jsxFragment,
                      useBuiltIns: true
                    }
                  ],
                  [
                    // Parse and transform TypeScript without performing type checking
                    // https://babeljs.io/docs/en/next/babel-preset-typescript.html
                    require.resolve('@babel/preset-typescript'),
                    {
                      jsxPragma: opts.jsxPragma
                    }
                  ]
                ]
              }
            }
          ]
        }
      ]
    }
  }
}
