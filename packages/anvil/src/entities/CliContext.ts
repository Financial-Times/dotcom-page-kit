import { CliPrompt } from './CliPrompt'
import { Pluggable, Plugin } from '@financial-times/anvil-pluggable'
import { AnyObject, AnvilConfig } from '@financial-times/anvil-types-generic'

interface ConstructorArgs {
  config: AnvilConfig
  plugins: Plugin[]
  prompt?: CliPrompt
  workingDir: string
}

export class CliContext extends Pluggable {
  cli = this
  args: AnyObject = {}
  prompt: CliPrompt
  config: AnvilConfig
  options: AnyObject = {}
  workingDir: string

  constructor({ prompt = new CliPrompt(), workingDir, plugins, config }: ConstructorArgs) {
    super({ alias: 'cli', plugins })

    this.prompt = prompt
    this.workingDir = workingDir
    this.config = normaliseConfig(config)
  }
}

function normaliseConfig(config?: AnvilConfig) {
  return { plugins: [], settings: {}, ...config }
}
