import { CliContext } from '../context/CliContext'

export function loadWorkingDirPlugins(context: CliContext) {
  const plugins = loadPlugins(context)
  context.addPlugins(plugins)
}

function loadPlugins({ paths, config }: CliContext): any[] {
  return config.plugins.map((moduleName) => {
    const pluginPath = require.resolve(moduleName, { paths: [paths.workingDir] })
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
