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
