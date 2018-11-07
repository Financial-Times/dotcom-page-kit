interface Args {
  amend?: (hook: string, value: any) => void
}

export default ({ amend }: Args = {}) => {
  const opts = {
    classProperties: {},
    objectRestSpread: {},
    dynamicImport: {}
  }

  const config = {
    presets: [],
    plugins: [
      [require.resolve('@babel/plugin-proposal-class-properties'), opts.classProperties],
      [require.resolve('@babel/plugin-proposal-object-rest-spread'), opts.objectRestSpread],
      [require.resolve('@babel/plugin-syntax-dynamic-import'), opts.dynamicImport]
    ]
  }

  if (amend) {
    amend('babelConfig::plugin::proposalClassProperties::options', opts.classProperties)
    amend('babelConfig::plugin::proposalObjectRestSpread::options', opts.objectRestSpread)
    amend('babelConfig::plugin::syntaxDynamicImport::options', opts.dynamicImport)
  }

  return config
}
