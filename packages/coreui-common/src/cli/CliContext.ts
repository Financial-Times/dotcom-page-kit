import { Context } from 'adonai'
import { Command } from 'commander'
import { AnyObject } from '../types'
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

  amend = (name: string, value) => {
    const nameParts = name.split('::')
    const subject = nameParts[nameParts.length - 1]
    return this.runner.run(
      `amend::${name}`,
      { [subject]: value },
      { $return: subject, $pluginMayReturn: subject, $pluginResultIsMergeable: true }
    )
  }
}

function prepareCliArgs(context: CliContext, command: any) {
  const args = command.parent.args.slice(0, -1)
  command._args.forEach((arg, idx) => {
    context.args[arg.name] = args[idx]
  })
}
