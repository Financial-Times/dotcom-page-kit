import path from 'path'
import { CliContext } from '../entities/CliContext'
import { getCommanderProgram } from './getCommanderProgram'
import { CliPrompt } from '../entities/CliPrompt'
import { AnvilConfig } from '@financial-times/anvil-types-generic'

interface Args {
  argv: string[]
  workingDir: string
}

export async function executeCli({ argv, workingDir }: Args) {
  const prompt = new CliPrompt()

  try {
    const config = getWorkingDirConfig(workingDir)
    const plugins = getPluginsListedInConfig(config, workingDir)
    const cli = new CliContext({ prompt, config, workingDir, plugins })

    getCommanderProgram(cli).parse(argv)
  } catch (error) {
    prompt.failure(error)
  }
}

function getWorkingDirConfig(workingDir: string) {
  return require(path.join(workingDir, 'anvil.config.json'))
}

function getPluginsListedInConfig(config: AnvilConfig, workingDir: string) {
  return config.plugins.map((moduleName) => {
    const pluginPath = require.resolve(moduleName, { paths: [workingDir] })
    return requirePlugin(pluginPath)
  })
}

function requirePlugin(pluginPath: string) {
  const plugin = getDefaultExportOf(require(pluginPath))
  if (typeof plugin === 'function') return plugin
  else throw new TypeError('Plugin must be a function')
}

function getDefaultExportOf(mod) {
  return mod && mod.__esModule ? mod['default'] : mod
}
