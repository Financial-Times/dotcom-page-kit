import { Plugin } from 'adonai'
import babelPreset from './babel'
import { RunningBabelContext } from '@financial-times/anvil-types-build'

export default new Plugin(({ on }) => {
  on('anvil::cli::operation::@build::amend::babelConfig', amendBabelConfig)
})

function amendBabelConfig({ dispatcher: operation, babelConfig }: RunningBabelContext) {
  babelConfig.presets.push(babelPreset(operation))
}
