import { CliContext } from '../context/CliContext'
import { AnyObject } from '@financial-times/anvil-types-generic'

export function loadWorkingDirPlugins(context: CliContext) {
  const plugins = loadPlugins(context.paths.workingDir, context.config)
  context.addPlugins(plugins)
}

function loadPlugins(directory: string, config: AnyObject): any[] {
  return config.plugins.map((moduleName) => {
    const pluginPath = require.resolve(moduleName, { paths: [directory] })
    return interopRequire(pluginPath)
  })
}

function interopRequire(pluginPath: string) {
  // handle modules written with ESM transpiled to CJS
  const obj = require(pluginPath)
  const plugin = obj && obj.__esModule ? obj['default'] : obj

  // HACK: cannot check instanceof
  if (plugin.constructor.name === 'Plugin') {
    return plugin
  } else {
    throw new TypeError('Plugin must be an instance of Plugin')
  }
}
