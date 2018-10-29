import { CliContext } from '../context/CliContext'
import { pack, getDefaultWebpackConfig } from 'coreui-webpack'
import getDefaultBabelConfig from 'coreui-babel'

buildWebpack.meta = {
  isAsync: true
}

export async function buildWebpack(c: CliContext) {
  const { srcFile, outDir, devMode } = c.flags
  const babelConfig = c.amend('babelConfig', getDefaultBabelConfig())
  const defaultWebpackConfig = getDefaultWebpackConfig({ srcFile, outDir, babelConfig, devMode })
  const webpackConfig = c.amend('webpackConfig', defaultWebpackConfig)
  c.amend('webpackConfig::scriptsRule', webpackConfig.module.rules[0])
  await pack(webpackConfig)
}
