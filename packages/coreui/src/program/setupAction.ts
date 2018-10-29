import camelCase from 'lodash.camelcase'
import { CliContext } from '../context/CliContext'
import { loadCliPluginsFromWorkingDir } from '../helpers/loadCliPluginsFromWorkingDir'
import { getPackageFolderPathRelativeTo } from 'coreui-utils'

interface Action {
  execute: (c: CliContext) => any
  prepareContext: (c: CliContext) => void
}

interface Args {
  action: Action
  workingDir: string
}

// Main =========================================================================

export function setupAction(a: Args) {
  return async (...args) => {
    const cli = {
      args: args.slice(0, -1),
      command: args[args.length - 1]
    }

    const c = new CliContext({ workingDir: a.workingDir })

    await loadCliPluginsFromWorkingDir(c)
    prepareCliContextDirs(c)
    prepareCliContextFlags(c, cli.command)
    prepareCliContextArgs(c, cli.args, cli.command)
    await runActionContextPreparer(c, a.action)

    await a.action.execute(c)
  }
}

// Helpers =====================================================================

function prepareCliContextDirs(c: CliContext) {
  c.paths.packageDir = getPackageFolderPathRelativeTo(__dirname)
}

function prepareCliContextArgs(c: CliContext, args: any[], command: any) {
  command._args.forEach((a, i) => {
    c.args[a.name] = args[i]
  })
}

function prepareCliContextFlags(c: CliContext, command: any) {
  command.options.forEach((o) => {
    const flagName = camelCase(o.long)
    c.flags[flagName] = command[flagName]
  })
}

async function runActionContextPreparer(c: CliContext, action) {
  if (action.prepareContext) {
    await action.prepareContext(c)
  }
}
