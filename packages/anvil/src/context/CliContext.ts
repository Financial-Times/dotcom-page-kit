import { Context } from 'adonai'
import { Command } from 'commander'
import { AnyObject } from '@financial-times/anvil-types-generic'
import { CliMessenger } from './CliMessenger'

interface ConstructorArgs {
  command: Command
  messenger: CliMessenger
  workingDir: string
}

export class CliContext extends Context {
  paths = {
    workingDir: '',
    packageDir: ''
  }

  args: AnyObject = {}

  flags: AnyObject = {}

  messenger: CliMessenger

  constructor({ workingDir, command, messenger }: ConstructorArgs) {
    super()

    this.paths.workingDir = workingDir
    this.messenger = messenger
    this.flags = command.opts()

    prepareCliArgs(this, command)
  }
}

function prepareCliArgs(context: CliContext, command: any) {
  const args = command.parent.args.slice(0, -1)
  command._args.forEach((arg, idx) => {
    context.args[arg.name] = args[idx]
  })
}
