import { Plugin } from 'adonai'
import babelPreset from './babel'
import { RunningBabelContext } from '@financial-times/anvil-types-build'

export default new Plugin(({ on }) => {
  on('babelConfig', amendBabelConfig)
})

function amendBabelConfig({ cli, babelConfig }: RunningBabelContext) {
  babelConfig.presets.push(babelPreset(cli))
}
