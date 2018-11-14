import { CliContext } from '../context/CliContext'
import { pack } from '../utils/pack'
import { getDefaultWebpackConfig } from './getDefaultWebpackConfig'

buildWebpack.meta = {
  isAsync: true
}

export async function buildWebpack({ context }: CliContext) {
  context.messenger.setTitle('Compiling build')
  context.messenger.startProgressBar()
  const webpackConfig = context.amend('webpackConfig', getDefaultWebpackConfig(context))
  const onProgress = (value) => context.messenger.updateProgressBar(value)
  await pack({ webpackConfig, onProgress })
  context.messenger.stopProgressBar()
}
