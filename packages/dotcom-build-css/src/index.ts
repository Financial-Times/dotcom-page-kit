import CSSMinimizerPlugin from 'css-minimizer-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import RemoveEmptyScriptsPlugin from 'webpack-remove-empty-scripts'
import type webpack from 'webpack'

const cssLoaderOptions = {
  // Disable Webpack from resolving url() because we do not
  // currently use this functionality.
  url: false
}

export const cssRule = (additionalLoaderOptions: Record<string, any> = {}) => [
  // Extracts CSS into separate, non-JS files
  // https://github.com/webpack-contrib/mini-css-extract-plugin
  {
    loader: MiniCssExtractPlugin.loader
  },
  // Add support for handling .css files
  // https://github.com/webpack-contrib/css-loader
  {
    loader: require.resolve('css-loader'),
    options: { ...cssLoaderOptions, ...additionalLoaderOptions }
  }
]

export class PageKitCssPlugin {
  apply(compiler: webpack.Compiler) {
    const miniCssExtractPluginOptions = {
      // only include content hash in filename when compiling production assets
      filename: compiler.options.mode === 'development' ? '[name].css' : '[name].[contenthash:12].css',
      // we load CSS files ourselves in  `dotcom-ui-shell` so don't need the runtime
      runtime: false
    }

    compiler.options.module.rules.push({
      test: [/\.css$/],
      use: cssRule()
    })

    compiler.options.optimization.minimizer = ['...', new CSSMinimizerPlugin()]

    // 2024 and this is still an issue :/ mini-css-extract-plugin leaves
    // behind empty .js bundles after extracting the CSS.
    // https://github.com/webpack/webpack/issues/11671
    new RemoveEmptyScriptsPlugin().apply(compiler)
    new MiniCssExtractPlugin(miniCssExtractPluginOptions).apply(compiler)
  }
}
