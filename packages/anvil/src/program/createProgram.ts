import build from '../actions/build'
import { setupAction } from './setupAction'
import { AnyObject } from '@financial-times/anvil-types-generic'

interface Args {
  workingDir: string
}

export function createProgram(args: Args) {
  const program = require('commander')
  const config = loadConfigFile(args.workingDir)

  program
    .command('build')
    .option('-s, --srcFile [filePath]', 'Path to src file', 'src/index.js')
    .option('-o, --outDir [folderPath]', 'Path to output folder', 'dist')
    .option('-d, --devMode', 'Whether to build in dev mode or not', false)
    .action(setupAction({ action: build, config, ...args }))

  return program
}

function loadConfigFile(directory: string): AnyObject {
  const configFilePath = require.resolve('anvil.config.json', { paths: [directory] })
  return require(configFilePath)
}
