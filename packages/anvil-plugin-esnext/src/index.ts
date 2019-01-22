import { Plugin } from 'adonai'
import babelPreset from './babel'
import { RunningBabelContext } from '@financial-times/anvil-types-build'

export default new Plugin(({ on }) => {
  on('anvil::cli::@build::babelConfig', amendBabelConfig)
})

function amendBabelConfig({ cli, babelConfig }: RunningBabelContext) {
  babelConfig.presets.push(babelPreset(cli))
}
