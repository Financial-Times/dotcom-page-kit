import { Command } from 'commander'
import action from './defineAction'
import { setupAction } from '../../program/setupAction'

/**
 * Register action
 *
 * This adds the command and associated action to the CLI program
 */
export function registerAction(program: Command, args: ProgramArgs): Command {
  return program
    .command('build')
    .option('-s, --srcFile [filePath]', 'Path to source file', 'src/index.js')
    .option('-o, --outDir [folderPath]', 'Path to output folder', 'dist')
    .option('-d, --devMode', 'Whether to build in dev mode or not', false)
    .action(setupAction({ action, ...args }))
}
