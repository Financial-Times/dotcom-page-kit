import { Context } from 'adonai'
import { CliMessenger } from './CliMessenger'

interface ConstructorArgs {
  messenger: CliMessenger
  workingDir: string
  flags: AnyObject
  args: AnyObject
}

export class CliContext extends Context {
  paths = {
    workingDir: ''
  }

  args: AnyObject = {}

  flags: AnyObject = {}

  messenger: CliMessenger

  constructor({ workingDir, args, flags, messenger }: ConstructorArgs) {
    super()

    this.paths.workingDir = workingDir
    this.messenger = messenger
    this.flags = flags
    this.args = args
  }

  amend = (name: string, value) => {
    const subject = name.split('::').pop()

    return this.runner.run(
      `amend::${name}`,
      { [subject]: value },
      { $return: subject, $pluginMayReturn: subject, $pluginResultIsMergeable: true }
    )
  }
}
