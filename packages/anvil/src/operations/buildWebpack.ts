import { pack } from '../utils/pack'
import { CliContext } from '../context/CliContext'
import { getDefaultWebpackConfig } from './getDefaultWebpackConfig'

export async function buildWebpack(context: CliContext) {
  const watch = context.flags.watch
  const messenger = context.messenger
  const defaultWebpackConfig = getDefaultWebpackConfig(context)

  if (watch) {
    messenger.clearScreen()
  }
  messenger.setTitle('Compiling build')

  await pack({
    watch,
    stdin: true,
    webpackConfig: context.amend('webpackConfig', defaultWebpackConfig),
    onProgress: (value) => onProgress(context, value),
    onComplete: () => onComplete(context),
    onWatching: () => onWatching(context),
    onWatchEnd: () => onWatchEnd(context),
    onWatchError: (error) => onWatchError(context, error)
  })
}

function onProgress({ messenger }: CliContext, value: number) {
  if (value === 0) messenger.startProgressBar()
  messenger.updateProgressBar(value)
}

function onComplete({ messenger }: CliContext) {
  messenger.indicateSuccess('build complete')
  messenger.newLine()
}

function onWatching({ messenger }: CliContext) {
  messenger.clearScreen()
  messenger.setTitle('Compiling build')
  messenger.indicateActivity('watching for changes ...')
  messenger.showCursor()
}

function onWatchError({ messenger }: CliContext, error: Error) {
  messenger.indicateFailure(error)
  messenger.newLine()
  messenger.indicateActivity('Watching for changes ...')
  messenger.showCursor()
}

function onWatchEnd({ messenger }: CliContext) {
  messenger.clearScreen()
  messenger.showCursor()
}
