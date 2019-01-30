import babelPreset from './babel'
import { HandlerArgs } from '@financial-times/anvil'

export default ({ on }) => {
  on('babelConfig', amendBabelConfig)
}

function amendBabelConfig({ cli, resource: babelConfig }: HandlerArgs) {
  babelConfig.presets.push(babelPreset(cli))
}
