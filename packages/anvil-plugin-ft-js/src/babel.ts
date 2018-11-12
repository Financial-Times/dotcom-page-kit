interface Args {
  amend?: (hook: string, value: any) => void
}

export default ({ amend }: Args = {}) => {
  const jsx = {
    pragma: 'h',
    fragment: 'Fragment'
  }

  const opts = {
    presetReact: {
      pragma: jsx.pragma,
      pragmaFrag: jsx.fragment,
      useBuiltIns: false
    },
    presetTypescript: {
      jsxPragma: jsx.pragma
    },
    pluginDynamicImport: {},
    pluginClassProperties: {},
    pluginObjectRestSpread: {}
  }

  const config = {
    presets: [
      [require.resolve('@babel/preset-react'), opts.presetReact],
      [require.resolve('@babel/preset-typescript'), opts.presetTypescript]
    ],
    plugins: [
      [require.resolve('@babel/plugin-proposal-class-properties'), opts.pluginClassProperties],
      [require.resolve('@babel/plugin-proposal-object-rest-spread'), opts.pluginObjectRestSpread],
      [require.resolve('@babel/plugin-syntax-dynamic-import'), opts.pluginDynamicImport]
    ]
  }

  if (amend) {
    amend('babelConfig::preset::react::options', opts.presetReact)
    amend('babelConfig::preset::typescript::options', opts.presetTypescript)
    amend('babelConfig::plugin::proposalClassProperties::options', opts.pluginClassProperties)
    amend('babelConfig::plugin::proposalObjectRestSpread::options', opts.pluginObjectRestSpread)
    amend('babelConfig::plugin::syntaxDynamicImport::options', opts.pluginDynamicImport)
  }

  return config
}
