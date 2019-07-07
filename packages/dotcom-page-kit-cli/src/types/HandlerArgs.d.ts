import { CliContext } from '../entities/CliContext'
import * as pluggable from '@financial-times/dotcom-page-kit-pluggable'

export interface HandlerArgs extends pluggable.HandlerArgs {
  cli: CliContext
}

export type TWebpackConfig = {
  [key: string]: any
}

export type TArguments = {
  [key: string]: any
}

export type TOptions = {
  watch: any
  development: any
  entryFile: any
  outputPath: any
}
