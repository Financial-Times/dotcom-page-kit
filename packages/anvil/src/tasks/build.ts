import path from 'path'
import { name, as, $if } from 'adonai'
import { CliOperation } from '../entities/CliOperation'
import { getWebpackConfig } from '../operations/getWebpackConfig'
import { compileWebpackConfig } from '../operations/compileWebpackConfig'

export async function build(operation: CliOperation) {
  return operation
    .routine()
    .with(name('@build'))
    .then(expandOutputPath, $if(outputPathIsNotAbsolute), as('operation.options.outputPath'))
    .then(expandEntryFilePath, $if(entryFilePathIsNotAbsolute), as('operation.options.entryFile'))
    .then(getWebpackConfig, as('webpackConfig'))
    .then(compileWebpackConfig)
    .exec()
}

function expandEntryFilePath(operation: CliOperation) {
  return path.join(operation.workingDir, operation.options.entryFile)
}

function expandOutputPath(operation: CliOperation) {
  return path.join(operation.workingDir, operation.options.outputPath)
}

function entryFilePathIsNotAbsolute(operation: CliOperation) {
  return !path.isAbsolute(operation.options.entryFile)
}

function outputPathIsNotAbsolute(operation: CliOperation) {
  return !path.isAbsolute(operation.options.outputPath)
}
