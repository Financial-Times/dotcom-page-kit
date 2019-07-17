import { hooks } from './hooks'
import { PluginOptions } from './types'
import { CliContext } from '@financial-times/dotcom-page-kit-cli'

export default (options: PluginOptions = {}, cli: CliContext) => {
  const presetReactOptions = cli.publish(hooks.BABEL_PRESET_REACT_OPTIONS, {
    pragma: options.jsxPragma,
    pragmaFrag: options.jsxPragmaFrag
  })

  const presetTypescriptOptions = cli.publish(hooks.BABEL_PRESET_TYPESCRIPT_OPTIONS, {
    jsxPragma: options.jsxPragma
  })

  const pluginSyntaxDynamicImportOptions = cli.publish(hooks.BABEL_PLUGIN_SYNTAX_DYNAMIC_IMPORT_OPTIONS, {})

  const pluginClassPropertiesOptions = cli.publish(hooks.BABEL_PLUGIN_CLASS_PROPERTIES_OPTIONS, {})

  const pluginTransformRuntimeOptions = cli.publish(hooks.BABEL_PLUGIN_TRANSFORM_RUNTIME_OPTIONS, {})

  const config = {
    presets: [
      [require.resolve('@babel/preset-react'), presetReactOptions],
      // This only enables the parsing of TypeScript, it does not check types
      [require.resolve('@babel/preset-typescript'), presetTypescriptOptions]
    ],
    plugins: [
      // This is required by @babel/preset-typescript
      // https://github.com/tc39/proposal-class-fields
      [require.resolve('@babel/plugin-proposal-class-properties'), pluginClassPropertiesOptions],
      // This enables Babel's built-in 'dynamicImport' flag which defines import() function usage
      [require.resolve('@babel/plugin-syntax-dynamic-import'), pluginSyntaxDynamicImportOptions],
      [require.resolve('@babel/plugin-transform-runtime'), pluginTransformRuntimeOptions]
    ] as any[]
  }

  // HACK: Allow CommonJS require() of ESM default exports without .default
  // This is here because we have a large amount of source code which still needs it and n-ui allowed it.
  // <https://github.com/babel/babel/issues/2212>
  if (options.enableRequireDefault) {
    config.plugins.push(require.resolve('babel-plugin-transform-require-default'))
  }

  return config
}
