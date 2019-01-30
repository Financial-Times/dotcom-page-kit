import path from 'path'
import { CliContext } from '../entities/CliContext'
import { getWebpackConfig } from '../operations/getWebpackConfig'
import { compileWebpackConfig } from '../operations/compileWebpackConfig'

export async function build(cli: CliContext) {
  if (!entryFilePathIsAbsolute(cli)) {
    expandEntryFilePath(cli)
  }

  if (!outputPathIsAbsolute(cli)) {
    expandOutputPath(cli)
  }

  const webpackConfig = getWebpackConfig(cli)
  return compileWebpackConfig(cli, webpackConfig)
}

function expandEntryFilePath({ options, workingDir }: CliContext) {
  options.entryFile = path.join(workingDir, options.entryFile)
}

function expandOutputPath({ options, workingDir }: CliContext) {
  options.outputPath = path.join(workingDir, options.outputPath)
}

function entryFilePathIsAbsolute({ options }: CliContext) {
  return path.isAbsolute(options.entryFile)
}

function outputPathIsAbsolute({ options }: CliContext) {
  return path.isAbsolute(options.outputPath)
}
