import webpack from 'webpack'
import { Pluggable, Plugin } from '@financial-times/dotcom-page-kit-pluggable'

interface ConstructorArgs {
  config: webpack.Configuration
  isDevMode: boolean
  plugins: Plugin[]
}

export class ConfigContext extends Pluggable {
  context = this
  config: webpack.Configuration
  isDevMode: boolean

  constructor({ config, isDevMode, plugins }: ConstructorArgs) {
    super({ alias: 'context', plugins })

    this.config = config
    this.isDevMode = isDevMode
  }
}
