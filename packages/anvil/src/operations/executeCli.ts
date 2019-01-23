import path from 'path'
import { CliPrompt } from '../entities/CliPrompt'
import { CliContext } from '../entities/CliContext'
import { CommanderStatic } from 'commander'
import { getCommanderProgram } from './getCommanderProgram'
import { Plugin, name, and, as } from 'adonai'

interface Args {
  argv: string[]
  workingDir: string
}

interface RunningArgs {
  argv: string[]
  program: CommanderStatic
}

export async function executeCli({ argv, workingDir }: Args) {
  const prompt = new CliPrompt()

  try {
    return await new CliContext({ prompt, workingDir })
      .routine({ argv })
      .with(name('executeCli'))
      .then(getWorkingDirConfig, as('cli.config'))
      .then(getPluginsListedInConfig, and(addPluginsToCli))
      .then(getCommanderProgram, as('program'))
      .then(executeCommanderProgram)
      .exec()
  } catch (error) {
    prompt.failure(error)
  }
}

function getWorkingDirConfig(cli: CliContext) {
  return require(path.join(cli.workingDir, 'anvil.config.json'))
}

function getPluginsListedInConfig(cli: CliContext) {
  return cli.config.plugins.map((moduleName) => {
    const pluginPath = require.resolve(moduleName, { paths: [cli.workingDir] })
    return requirePlugin(pluginPath)
  })
}

function requirePlugin(pluginPath: string) {
  const plugin = getDefaultExportOf(require(pluginPath))
  if (plugin.$$isPlugin) return plugin
  else throw new TypeError('Plugin must be an instance of Plugin')
}

function getDefaultExportOf(mod) {
  return mod && mod.__esModule ? mod['default'] : mod
}

function addPluginsToCli(cli: CliContext, plugins: Plugin[]) {
  cli.add(plugins)
}

function executeCommanderProgram({}, { program, argv }: RunningArgs) {
  program.parse(argv)
}
