import { Plugin } from 'adonai'

export default (entry) => {
  return new Plugin(({ on }) => {
    on('@Build::amend::webpackConfig', amendWebpackConfig)
  })

  function amendWebpackConfig({ webpackConfig }) {
    webpackConfig.entry = entry
  }
}
