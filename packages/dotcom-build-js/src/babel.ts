import { hooks } from './hooks'
import { PluginOptions } from './types'
import { ConfigContext } from '@financial-times/dotcom-page-kit-cli'

export default (options: PluginOptions = {}, context: ConfigContext) => {
  const presetReactOptions = context.publish(hooks.BABEL_PRESET_REACT_OPTIONS, {
    pragma: options.jsxPragma,
    pragmaFrag: options.jsxPragmaFrag
  })

  const presetTypescriptOptions = context.publish(hooks.BABEL_PRESET_TYPESCRIPT_OPTIONS, {
    jsxPragma: options.jsxPragma
  })

  const pluginSyntaxDynamicImportOptions = context.publish(hooks.BABEL_PLUGIN_SYNTAX_DYNAMIC_IMPORT_OPTIONS, {})

  const pluginClassPropertiesOptions = context.publish(hooks.BABEL_PLUGIN_CLASS_PROPERTIES_OPTIONS, {})

  const pluginTransformRuntimeOptions = context.publish(hooks.BABEL_PLUGIN_TRANSFORM_RUNTIME_OPTIONS, {
    // You might think we'd want to abstract the helper functions so they can be reused but doing so
    // means we generate unstable hashes because the generated helper modules are at the bottom of
    // the dependency tree but their contents depends on the features each app uses. Inlining them
    // adds little (usually <1kb) to our total JS payload because the minimizer can usually reduce
    // them down and actually result in fewer function calls overall!
    // <https://github.com/Financial-Times/dotcom-page-kit/issues/576>
    helpers: false
  })

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

  return config
}
