import build from '../actions/build'
import { setupAction } from './setupAction'

interface Args {
  workingDir: string
}

export function createProgram(args: Args) {
  const program = require('commander')

  program
    .command('build')
    .option('-e, --entryFile <file>', 'Path to the source code entry point', './src/index.js')
    .option('-o, --outputPath <path>', 'Path to the directory to store generated output', './dist')
    .option('-d, --development', 'Enable development mode', false)
    .option('-w, --watch', 'Watch for changes and rebuild on change')
    .action(setupAction({ action: build, ...args }))

  return program
}
