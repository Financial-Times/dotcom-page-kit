import { CliPrompt } from './CliPrompt'
import { AnyObject, AnvilConfig } from '@financial-times/anvil-types-generic'
import { DispatcherConstructorArgs, OperationContext } from 'adonai'

interface ConstructorArgs extends DispatcherConstructorArgs {
  prompt: CliPrompt
  workingDir: string
}

OperationContext

export class CliContext extends OperationContext {
  args: AnyObject = {}
  prompt: CliPrompt
  config: AnvilConfig = { plugins: [], settings: {} }
  options: AnyObject = {}
  workingDir: string

  constructor({ prompt = new CliPrompt(), workingDir, ...otherArgs }: ConstructorArgs) {
    super(otherArgs)

    this.scopeTo('anvil', 'cli')
    this.setAliasTo('cli')

    this.prompt = prompt
    this.workingDir = workingDir
  }
}
