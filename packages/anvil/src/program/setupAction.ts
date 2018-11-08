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

// Main =========================================================================

export function setupAction({ workingDir, action }: ActionArgs) {
  return async (...args) => {
    const messenger = new CliMessenger()
    try {
      // The commander instance is always the final argument
      const command: Command = args[args.length - 1]
      const context = new CliContext({ command, messenger, workingDir })

      await prepareContext(context, action)
      await action.execute(context)
    } catch (error) {
      messenger.indicateFailure(error)
    }
    messenger.newLine()
  }
}

// Helpers =====================================================================

async function prepareContext(context: CliContext, action: Action) {
  loadWorkingDirPlugins(context)

  if (typeof action.prepareContext === 'function') {
    await action.prepareContext(context)
  }
}
