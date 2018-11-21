import { PluginSettings } from './types'
import { CliContext } from '@financial-times/anvil'

/**
 * Returns the babel config
 *
 * NOTE: This file can also be specified as a preset in a .babelrc file.
 * When used in such a manner, there will be no args supplied to the function,
 * hence why the `context` arg is optional.
 */
export default (context?: CliContext) => {
  const settings: PluginSettings = context ? context.config.settings['ft-js'] : {}

  const jsx = {
    pragma: settings.jsxPragma || 'h',
    fragment: settings.jsxPragmaFrag || 'Fragment'
  }

  const options = {
    presetReact: {
      pragma: jsx.pragma,
      pragmaFrag: jsx.fragment
    },
    presetTypescript: {
      jsxPragma: jsx.pragma
    },
    pluginDynamicImport: {},
    pluginClassProperties: {},
    pluginObjectRestSpread: {},
    pluginTransformRuntime: {}
  }

  const config = {
    presets: [
      // Support JSX syntax and React dev tools if required
      // https://babeljs.io/docs/en/babel-preset-react
      [require.resolve('@babel/preset-react'), options.presetReact],
      // Parse and transform TypeScript without performing type checking
      // https://babeljs.io/docs/en/next/babel-preset-typescript.html
      [require.resolve('@babel/preset-typescript'), options.presetTypescript]
    ],
    plugins: [
      // Stage 3 proposal
      // https://github.com/tc39/proposal-class-fields
      [require.resolve('@babel/plugin-proposal-class-properties'), options.pluginClassProperties],
      // Stage 4 proposal
      // https://github.com/tc39/proposal-object-rest-spread
      [require.resolve('@babel/plugin-proposal-object-rest-spread'), options.pluginObjectRestSpread],
      // Enable Babel's built-in 'dynamicImport' flag which defines import() function usage
      // https://babeljs.io/docs/en/next/babel-plugin-syntax-dynamic-import.html
      [require.resolve('@babel/plugin-syntax-dynamic-import'), options.pluginDynamicImport],
      // Enables the re-use of Babel helpers to save on codesize
      // https://babeljs.io/docs/en/next/babel-plugin-transform-runtime.html
      [require.resolve('@babel/plugin-transform-runtime'), options.pluginTransformRuntime]
    ]
  }

  if (context) {
    context.amend('babelConfig::preset::react::options', options.presetReact)
    context.amend('babelConfig::preset::typescript::options', options.presetTypescript)
    context.amend('babelConfig::plugin::proposalClassProperties::options', options.pluginClassProperties)
    context.amend('babelConfig::plugin::proposalObjectRestSpread::options', options.pluginObjectRestSpread)
    context.amend('babelConfig::plugin::syntaxDynamicImport::options', options.pluginDynamicImport)
    context.amend('babelConfig::plugin::transformRuntime::options', options.pluginTransformRuntime)
  }

  return config
}
