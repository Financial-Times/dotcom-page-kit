import { CliContext } from '@financial-times/anvil-plugin-helpers'

export async function loadWorkingDirPlugins(c: CliContext) {
  const pluginNames = (await getConfigFileDataInProjectDir(c)).plugins
  const plugins = getThesePluginsFromDir({ plugins: pluginNames, dir: c.paths.workingDir })
  c.addPlugins(plugins)
}

function getThesePluginsFromDir({ plugins, dir }) {
  return plugins.map((pluginName) => {
    const pluginPath = require.resolve(pluginName, { paths: [dir] })
    return require(pluginPath).default
  })
}

async function getConfigFileDataInProjectDir(c: CliContext) {
  const configFilePath = require.resolve('anvil.config.json', { paths: [c.paths.workingDir] })
  return require(configFilePath)
}
