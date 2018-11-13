import { CliContext } from '../context/CliContext'
import { AnyObject } from '@financial-times/anvil-types-generic'

export function loadWorkingDirPlugins(context: CliContext) {
  const config = loadConfigFile(context.paths.workingDir)
  const plugins = loadPlugins(context.paths.workingDir, config)
  context.addPlugins(plugins)
}

function loadConfigFile(dir) {
  const configFilePath = require.resolve('anvil.config.json', { paths: [dir] })
  return require(configFilePath)
}

function loadPlugins(dir, config) {
  return config.plugins.map((moduleName) => {
    const pluginPath = require.resolve(moduleName, { paths: [dir] })
    const plugin = interopRequire(pluginPath)
    const settings = findPluginSettings(moduleName, config)

    return initialisePlugin(plugin, settings)
  })
}

function interopRequire(pluginPath: string) {
  // handle modules written with ESM transpiled to CJS
  const obj = require(pluginPath)
  return obj && obj.__esModule ? obj['default'] : obj
}

function findPluginSettings(moduleName: string, config): AnyObject {
  const pluginName = moduleName.split('plugin-').pop()
  return config.settings ? config.settings[pluginName] : {}
}

function initialisePlugin(plugin, settings?) {
  if (typeof plugin === 'function') {
    return plugin(settings)
  }

  // HACK: cannot check instanceof
  if (plugin.constructor.name === 'Plugin') {
    return plugin
  }

  throw new TypeError('Plugin must export one of: function, Plugin')
}
