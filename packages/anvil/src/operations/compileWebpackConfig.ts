import { pack } from '../utils/pack'
import { AnyObject } from '@financial-times/anvil-types-generic'
import { CliOperation } from '../entities/CliOperation'

const WATCHING_FOR_CHANGES = 'watching for changes ...'

interface Args {
  webpackConfig: AnyObject
}

export async function compileWebpackConfig(operation: CliOperation, { webpackConfig }: Args) {
  const watch = operation.options.watch

  if (watch) {
    operation.prompt.clearScreen()
  }
  operation.prompt.title('Compiling build')

  await pack({
    watch,
    stdin: true,
    webpackConfig,
    onProgress: (value) => onProgress(operation, value),
    onComplete: () => onComplete(operation),
    onWatching: () => onWatching(operation),
    onWatchEnd: () => onWatchEnd(operation),
    onWatchError: (error) => onWatchError(operation, error)
  })
}

function onProgress({ prompt }: CliOperation, value: number) {
  if (value === 0) prompt.startProgressBar()
  prompt.updateProgressBar(value)
}

function onComplete({ prompt }: CliOperation) {
  prompt.success('build complete')
  prompt.newLine()
}

function onWatching({ prompt }: CliOperation) {
  prompt.clearScreen()
  prompt.title('Compiling build')
  prompt.activity(WATCHING_FOR_CHANGES)
  prompt.cursor()
}

function onWatchError({ prompt }: CliOperation, error: Error) {
  prompt.failure(error)
  prompt.newLine()
  prompt.activity(WATCHING_FOR_CHANGES)
  prompt.cursor()
}

function onWatchEnd({ prompt }: CliOperation) {
  prompt.clearScreen()
  prompt.cursor()
}
