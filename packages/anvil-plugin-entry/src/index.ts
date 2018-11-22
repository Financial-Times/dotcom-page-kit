import { Plugin } from 'adonai'
import { RunningWebpackContext } from '@financial-times/anvil-types-build'
import { PluginSettings } from './types'

export default new Plugin(({ on }) => {
  on('@Build::amend::webpackConfig', amendWebpackConfig)
})

function amendWebpackConfig(runningContext: RunningWebpackContext) {
  const settings: PluginSettings = runningContext.context.config.settings.entry
  runningContext.webpackConfig.entry = settings
}
