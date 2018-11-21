import { Context } from 'adonai'
import { AnyObject } from '@financial-times/anvil-types-generic'
import { CliMessenger } from './CliMessenger'

interface ConstructorArgs {
  args: AnyObject
  flags: AnyObject
  config: AnyObject
  messenger: CliMessenger
  workingDir: string
}

export class CliContext extends Context {
  paths = {
    workingDir: ''
  }

  args: AnyObject = {}
  flags: AnyObject = {}
  config: AnyObject = {}
  messenger: CliMessenger

  constructor({ args, flags, config, messenger, workingDir }: ConstructorArgs) {
    super()

    this.args = args
    this.flags = flags
    this.config = config
    this.messenger = messenger
    this.paths.workingDir = workingDir
  }
}
