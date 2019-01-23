import path from 'path'
import { CliContext } from '../entities/CliContext'
import { name, as, $if } from 'adonai'
import { getWebpackConfig } from '../operations/getWebpackConfig'
import { compileWebpackConfig } from '../operations/compileWebpackConfig'

export async function build(cli: CliContext) {
  return cli
    .routine()
    .with(name('build'))
    .then(expandOutputPath, $if.not(outputPathIsAbsolute), as('cli.options.outputPath'))
    .then(expandEntryFilePath, $if.not(entryFilePathIsAbsolute), as('cli.options.entryFile'))
    .then(getWebpackConfig, as('webpackConfig'))
    .then(compileWebpackConfig)
    .exec()
}

function expandEntryFilePath(cli: CliContext) {
  return path.join(cli.workingDir, cli.options.entryFile)
}

function expandOutputPath(cli: CliContext) {
  return path.join(cli.workingDir, cli.options.outputPath)
}

function entryFilePathIsAbsolute(cli: CliContext) {
  return path.isAbsolute(cli.options.entryFile)
}

function outputPathIsAbsolute(cli: CliContext) {
  return path.isAbsolute(cli.options.outputPath)
}
