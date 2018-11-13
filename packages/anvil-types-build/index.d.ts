import { AnyObject } from '@financial-times/anvil-types-generic'
import { CliContext } from '@financial-times/anvil'

export interface RunningContext {
  c: CliContext
}

export interface RunningWebpackContext extends RunningContext {
  webpackConfig: AnyObject
}

export interface RunningBabelContext extends RunningContext {
  babelConfig: AnyObject
}
