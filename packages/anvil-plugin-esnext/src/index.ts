import { Plugin } from 'adonai'
import babelPreset from './babel'

export default new Plugin(({ on }) => {
  on('@Build::amend::babelConfig', amendBabelConfig)
})

function amendBabelConfig({ c, babelConfig }) {
  babelConfig.presets.push(babelPreset(c))
}
