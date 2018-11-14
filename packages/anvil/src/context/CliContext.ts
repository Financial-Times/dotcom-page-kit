import { Context } from 'adonai'
import { AnyObject } from '@financial-times/anvil-types-generic'
import { CliMessenger } from './CliMessenger'

interface ConstructorArgs {
  args: AnyObject
  flags: AnyObject
  messenger: CliMessenger
  workingDir: string
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

    this.args = args
    this.flags = flags
    this.messenger = messenger
    this.paths.workingDir = workingDir
  }
}
