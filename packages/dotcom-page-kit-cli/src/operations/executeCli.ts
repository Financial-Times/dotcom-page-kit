import path from 'path'
import { CliPrompt } from '../entities/CliPrompt'
import { CliContext } from '../entities/CliContext'
import { AnvilConfig } from '../types/AnvilConfig'
import { getCommanderProgram } from './getCommanderProgram'

interface Args {
  argv: string[]
  workingDir: string
}

export async function executeCli({ argv, workingDir }: Args) {
  const prompt = new CliPrompt()

  try {
    const config: AnvilConfig = getWorkingDirConfig(workingDir)
    const plugins = config.plugins
    const cli = new CliContext({ prompt, config, workingDir, plugins })

    getCommanderProgram(cli).parse(argv)
  } catch (error) {
    prompt.failure(error)
  }
}

function getWorkingDirConfig(workingDir: string) {
  return require(path.join(workingDir, 'page-kit.config.js'))
}
