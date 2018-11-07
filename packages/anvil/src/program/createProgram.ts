import build from '../actions/build'
import { setupAction } from './setupAction'

interface Args {
  workingDir: string
}

export function createProgram(a: Args) {
  const program = require('commander')

  program
    .command('build')
    .option('-s, --srcFile [filePath]', 'Path to src file', 'src/index.js')
    .option('-o, --outDir [folderPath]', 'Path to output folder', 'dist')
    .option('-d, --devMode', 'Whether to build in dev mode or not', false)
    .action(setupAction({ action: build, ...a }))

  return program
}
