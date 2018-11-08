import { loadWorkingDirPlugins } from '../helpers/loadWorkingDirPlugins'
import { CliContext, CliMessenger } from '@financial-times/anvil-plugin-helpers'
import { Command } from 'commander'

interface Action {
  execute: (c: CliContext) => Promise<any>
  prepareContext: (c: CliContext) => void
}

interface ActionArgs extends ProgramArgs {
  action: Action
}

export function setupAction({ workingDir, action }: ActionArgs) {
  return async (...args) => {
    const messenger = new CliMessenger()

    try {
      // The commander instance is always the final argument
      const command = args.pop()
      const flags = command.opts()
      const namedArgs = mapExpectedArgsToNames(command, args)
      const context = new CliContext({ flags, args: namedArgs, messenger, workingDir })

      await prepareContext(context, action)
      await action.execute(context)
    } catch (error) {
      messenger.indicateFailure(error)
    }

    messenger.newLine()
  }
}

function mapExpectedArgsToNames(program: Command, options: any[]) {
  // This function is naïve as command arguments may be optional
  const properties = program._args.map((arg) => arg.name)

  return options.reduce((map, option, i) => {
    map[properties[i]] = option
    return map
  }, {})
}

async function prepareContext(context: CliContext, action: Action) {
  loadWorkingDirPlugins(context)

  if (typeof action.prepareContext === 'function') {
    await action.prepareContext(context)
  }
}
