import { CliContext } from 'coreui-common'
import { pack, getDefaultWebpackConfig } from 'coreui-webpack'

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
