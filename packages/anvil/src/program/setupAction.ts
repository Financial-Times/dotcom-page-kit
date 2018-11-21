import { Command } from 'commander'
import { CliContext } from '../context/CliContext'
import { CliMessenger } from '../context/CliMessenger'
import { loadWorkingDirPlugins } from '../operations/loadWorkingDirPlugins'
import { AnvilConfig } from '@financial-times/anvil-types-generic'

interface Action {
  execute: (c: CliContext) => any
  prepareContext: (c: CliContext) => void
}

interface SetupArgs {
  action: Action
  workingDir: string
}

export function setupAction({ workingDir, action }: SetupArgs) {
  return async (...args) => {
    // Provide a shared toolset for formatted CLI output
    const messenger = new CliMessenger()

    try {
      // The commander instance is always the final argument
      const command = args.pop() as Command
      const flags = command.opts()
      const config = loadConfigFile(workingDir)
      const namedArgs = mapExpectedArgsToNames(command, args)
      const context = new CliContext({ args: namedArgs, flags, config, messenger, workingDir })

      await prepareContext(context, action)
      await action.execute(context)
    } catch (error) {
      messenger.indicateFailure(error)
    }

    messenger.newLine()
  }
}

function mapExpectedArgsToNames(program: Command, options: any[]) {
  // This function is naive as command arguments may be optional
  const properties = program._args.map((arg) => arg.name)

  return options.reduce((map, option, i) => {
    map[properties[i]] = option
    return map
  }, {})
}

function loadConfigFile(directory: string): AnvilConfig {
  const configFilePath = require.resolve('anvil.config.json', { paths: [directory] })
  return require(configFilePath) as AnvilConfig
}

async function prepareContext(context: CliContext, action: Action) {
  loadWorkingDirPlugins(context)

  if (typeof action.prepareContext === 'function') {
    await action.prepareContext(context)
  }
}
