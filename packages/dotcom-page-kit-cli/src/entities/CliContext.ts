import { CliPrompt } from './CliPrompt'
import { TArguments, TOptions } from '../types/CliConfig'
import { PageKitConfig } from '../types/PageKitConfig'
import { Pluggable, Plugin } from '@financial-times/dotcom-page-kit-pluggable'

interface ConstructorArgs {
  config: PageKitConfig
  plugins: Plugin[]
  prompt?: CliPrompt
  workingDir: string
}

export class CliContext extends Pluggable {
  cli = this
  args: TArguments
  prompt: CliPrompt
  config: PageKitConfig
  options: TOptions
  workingDir: string

  constructor({ prompt = new CliPrompt(), workingDir, plugins, config }: ConstructorArgs) {
    super({ alias: 'cli', plugins })

    this.prompt = prompt
    this.workingDir = workingDir
    this.config = normaliseConfig(config)
  }
}

function normaliseConfig(config: Partial<PageKitConfig> = {}) {
  return { plugins: [], settings: {}, ...config }
}
