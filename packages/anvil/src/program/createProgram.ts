import build from '../actions/build'
import { setupAction } from './setupAction'

interface Args {
  workingDir: string
}

export function createProgram(args: Args) {
  const program = require('commander')

  program
    .command('build')
    .option('-s, --srcFile <filePath>', 'Path to the source code entry point', './src/index.js')
    .option(
      '-o, --outDir <folderPath>',
      'Path to the destination directory to store generated code',
      './dist'
    )
    .option('-d, --devMode', 'Enable development mode', false)
    .option('-w, --watch', 'Watch for changes and rebuild on change')
    .action(setupAction({ action: build, ...args }))

  return program
}
