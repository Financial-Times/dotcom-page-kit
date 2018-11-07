interface Args {
  amend?: (hook: string, value: any) => void
}

export default ({ amend }: Args = {}) => {
  const presetEnvOpts = {}

  const config = {
    presets: [[require.resolve('@babel/preset-env'), presetEnvOpts]],
    plugins: [],
    babelrc: true
  }

  if (amend) {
    amend('babelConfig', config)
    amend('babelConfig::preset::env::options', presetEnvOpts)
  }

  return config
}
