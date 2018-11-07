import { loadWorkingDirPlugins } from '../helpers/loadWorkingDirPlugins'
import {
  CliContext,
  CliMessenger,
  getPackageFolderPathRelativeTo
} from '@financial-times/anvil-plugin-helpers'

interface Action {
  execute: (c: CliContext) => any
  prepareContext: (c: CliContext) => void
}

interface Args {
  action: Action
  workingDir: string
}

// Main =========================================================================

export function setupAction({ workingDir, action }: Args) {
  return async (...args) => {
    const messenger = new CliMessenger()
    try {
      const command = args[args.length - 1]
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
  prepareCliContextDirs(context)
  await runActionContextPreparer(context, action)
}

function prepareCliContextDirs(context: CliContext) {
  context.paths.packageDir = getPackageFolderPathRelativeTo(__dirname)
}

async function runActionContextPreparer(context: CliContext, action) {
  if (action.prepareContext) {
    await action.prepareContext(context)
  }
}
