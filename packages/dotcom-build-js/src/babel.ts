import { PluginOptions } from './types'

function getBabelConfig(options: PluginOptions = {}) {
  const presetEnvOpts = {
    targets: ['last 1 Chrome versions', 'Safari >= 13', 'ff ESR', 'last 1 Edge versions'],
    // Exclude transforms that make all code slower
    // See https://github.com/facebook/create-react-app/pull/5278
    exclude: ['transform-typeof-symbol']
  }

  const presetReactOptions = {
    pragma: options.jsxPragma,
    pragmaFrag: options.jsxPragmaFrag
  }

  const presetTypescriptOptions = {
    jsxPragma: options.jsxPragma
  }

  const pluginTransformRuntimeOptions = {
    // You might think we'd want to abstract the helper functions so they can be reused but doing so
    // means we generate unstable hashes because the generated helper modules are at the bottom of
    // the dependency tree but their contents depends on the features each app uses. Inlining them
    // adds little (usually <1kb) to our total JS payload because the minimizer can usually reduce
    // them down and actually result in fewer function calls overall!
    // <https://github.com/Financial-Times/dotcom-page-kit/issues/576>
    helpers: false
  }

  const config = {
    // By default Babel assumes all source code is ESM so force it to check for CJS
    sourceType: 'unambiguous',
    babelrc: true,
    cacheDirectory: true,
    presets: [
      [require.resolve('@babel/preset-env'), presetEnvOpts],
      [require.resolve('@babel/preset-react'), presetReactOptions],
      // This only enables the parsing of TypeScript, it does not check types
      [require.resolve('@babel/preset-typescript'), presetTypescriptOptions]
    ],
    plugins: [
      // This is required by @babel/preset-typescript
      // https://github.com/tc39/proposal-class-fields
      [require.resolve('@babel/plugin-proposal-class-properties')],
      // This enables Babel's built-in 'dynamicImport' flag which defines import() function usage
      [require.resolve('@babel/plugin-syntax-dynamic-import')],
      [require.resolve('@babel/plugin-transform-runtime'), pluginTransformRuntimeOptions]
    ]
  }

  return config
}

export default function getBabelRule(userOptions: PluginOptions) {
  return {
    test: [/\.(js|jsx|mjs|ts|tsx)$/],
    // NOTE: Do not exclude bower_components or node_modules directories
    // https://github.com/Financial-Times/dotcom-page-kit/issues/366
    exclude: [],
    use: {
      loader: require.resolve('babel-loader'),
      options: getBabelConfig(userOptions)
    }
  }
}
