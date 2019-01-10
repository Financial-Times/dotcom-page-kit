import { CliPrompt } from './CliPrompt'
import { AnyObject, AnvilConfig } from '@financial-times/anvil-types-generic'
import { Dispatcher, DispatcherConstructorArgs, reversedExecutionArgs } from 'adonai'

interface ConstructorArgs extends DispatcherConstructorArgs {
  prompt: CliPrompt
  workingDir: string
}

export class CliOperation extends Dispatcher {
  args: AnyObject = {}
  prompt: CliPrompt
  config: AnvilConfig = { plugins: [], settings: {} }
  options: AnyObject = {}
  workingDir: string

  constructor({ prompt = new CliPrompt(), workingDir, ...otherArgs }: ConstructorArgs) {
    super(otherArgs)

    this.addName('operation')
    this.addName('cli')
    this.addName('anvil')

    /*
      By default, calling `cliOperation.exec(fn)` will result in the fn being
      invoked like so `fn(args)` when the fn expects only one argument, and like so
      `fn(cliOperation, args)` if it expects two arguments. This is not what we want
      because the behavior is different when fns are invoked via an adonai routine. When
      invoked via a routine, the fn is always called as `fn(cliOperation, args)` regardless
      of the amount of arguments. So to keep things consistent, lets add a plugin to ensure that
      the fn is always invoked as `fn(cliOperation, args)`. (This comment may eventually be moved
      to the `reversedExecutionArgs` plugin file)
    */
    this.with(reversedExecutionArgs)

    this.prompt = prompt
    this.workingDir = workingDir
  }
}
