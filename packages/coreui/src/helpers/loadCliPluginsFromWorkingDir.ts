import fsx from 'fs-extra'
import path from 'path'
import { CliContext } from '../context/CliContext'

export async function loadCliPluginsFromWorkingDir(c: CliContext) {
  const pluginNames = (await getConfigFileDataInProjectDir(c)).plugins
  const plugins = getTheseCliPluginsFromDir({ plugins: pluginNames, dir: c.paths.workingDir })
  c.addPlugins(plugins)
}

function getTheseCliPluginsFromDir({ plugins, dir }) {
  return plugins.map((p) => {
    const pluginPath = path.join(dir, 'node_modules', p, 'dist/cjs/plugins/cli')
    return require(pluginPath).default
  })
}

export async function getConfigFileDataInProjectDir(c: CliContext) {
  const configFilePath = path.join(c.paths.workingDir, 'coreui.config.json') // TODO: Use `libName`
  return await fsx.readJson(configFilePath) // NOTE: We dont use `require` because we dont want the data to be cached
}

// TODO: Lookup the path to the cli plugin using package.json
