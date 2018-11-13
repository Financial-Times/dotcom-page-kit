import { Plugin } from 'adonai'
import { RunningWebpackContext } from '@financial-times/anvil-types-build'

export default new Plugin(({ on }) => {
  on('@Build::amend::webpackConfig', amendWebpackConfig)
})

function amendWebpackConfig({ c, webpackConfig }: RunningWebpackContext) {
  const cssRule = {
    test: /\.css$/,
    use: [
      {
        loader: require.resolve('style-loader'),
        options: {}
      },
      {
        loader: require.resolve('css-loader'),
        options: {
          modules: 1
        }
      }
    ]
  }
  c.amend('webpackConfig::cssRule', cssRule)
  c.amend('webpackConfig::cssRule::styleLoader', cssRule.use[0])
  c.amend('webpackConfig::cssRule::cssLoader', cssRule.use[1])
  webpackConfig.module.rules.push(cssRule)
}
