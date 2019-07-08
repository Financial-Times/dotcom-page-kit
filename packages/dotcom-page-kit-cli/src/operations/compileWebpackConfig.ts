import { pack } from '../utils/pack'
import { TWebpackConfig } from '../types/CliConfig'
import { CliContext } from '../entities/CliContext'

const WATCHING_FOR_CHANGES = 'watching for changes ...'

export async function compileWebpackConfig(cli: CliContext, webpackConfig: TWebpackConfig) {
  const watch = cli.options.watch
  const prompt = cli.prompt

  if (watch) {
    prompt.clearScreen()
  }
  prompt.title('Compiling build')

  await pack({
    watch,
    stdin: true,
    webpackConfig,
    onProgress: (value) => onProgress(cli, value),
    onComplete: () => onComplete(cli),
    onWatching: () => onWatching(cli),
    onWatchEnd: () => onWatchEnd(cli),
    onWatchError: (error) => onWatchError(cli, error)
  })
}

function onProgress({ prompt }: CliContext, value: number) {
  if (value === 0) prompt.startProgressBar()
  prompt.updateProgressBar(value)
}

function onComplete({ prompt }: CliContext) {
  prompt.success('build complete')
  prompt.newLine()
}

function onWatching({ prompt }: CliContext) {
  prompt.clearScreen()
  prompt.title('Compiling build')
  prompt.activity(WATCHING_FOR_CHANGES)
  prompt.cursor()
}

function onWatchError({ prompt }: CliContext, error: Error) {
  prompt.failure(error)
  prompt.newLine()
  prompt.activity(WATCHING_FOR_CHANGES)
  prompt.cursor()
}

function onWatchEnd({ prompt }: CliContext) {
  prompt.clearScreen()
  prompt.cursor()
}
