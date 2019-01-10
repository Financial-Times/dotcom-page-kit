import { build } from '../tasks/build'
import { setupTask } from './setupTask'
import { CliOperation } from '../entities/CliOperation'

export function getCommanderProgram(operation: CliOperation) {
  const program = require('commander')

  program
    .command('build')
    .option('-e, --entryFile <file>', 'Path to the source code entry point', './src/index.js')
    .option('-o, --outputPath <path>', 'Path to the directory to store generated output', './dist')
    .option('-d, --development', 'Enable development mode', false)
    .option('-w, --watch', 'Watch for changes and rebuild on change')
    .action(setupTask(operation, build))

  return program
}
