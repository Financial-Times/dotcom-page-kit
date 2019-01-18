import { AnyObject } from '@financial-times/anvil-types-generic'
import { CliOperation } from '@financial-times/anvil'

export interface RunningContext {
  dispatcher: CliOperation
}

export interface RunningWebpackContext extends RunningContext {
  webpackConfig: AnyObject
}

export interface RunningBabelContext extends RunningContext {
  babelConfig: AnyObject
}
