import { CliContext } from '../context/CliContext'
import { pack } from '../utils/pack'
import { getDefaultWebpackConfig } from './getDefaultWebpackConfig'

buildWebpack.meta = {
  isAsync: true
}

export async function buildWebpack(c: CliContext) {
  c.messenger.setTitle('Compiling build')
  c.messenger.startProgressBar()
  const webpackConfig = c.amend('webpackConfig', getDefaultWebpackConfig(c))
  await pack({
    webpackConfig,
    onProgress: (value) => {
      c.messenger.updateProgressBar(value)
    }
  })
  c.messenger.stopProgressBar()
}
