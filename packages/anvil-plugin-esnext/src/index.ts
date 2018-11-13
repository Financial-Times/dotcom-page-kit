import { Plugin } from 'adonai'
import babelPreset from './babel'
import { RunningBabelContext } from '@financial-times/anvil-types-build'

export default new Plugin(({ on }) => {
  on('@Build::amend::babelConfig', amendBabelConfig)
})

function amendBabelConfig({ c, babelConfig }: RunningBabelContext) {
  babelConfig.presets.push(babelPreset(c))
}
