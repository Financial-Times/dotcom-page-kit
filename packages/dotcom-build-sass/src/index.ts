import { PageKitCssPlugin, cssRule } from '@financial-times/dotcom-build-css'
import type webpack from 'webpack'

export type TPluginOptions = {
  includePaths?: string[]
  additionalData?: string
  webpackImporter?: boolean
  implementation?: 'sass' | 'sass-embedded'
}

export class PageKitSassPlugin {
  includePaths: string[]
  additionalData: string
  webpackImporter: boolean
  implementation: 'sass' | 'sass-embedded'

  constructor({
    includePaths = [],
    additionalData = '',
    webpackImporter,
    implementation = 'sass-embedded'
  }: TPluginOptions = {}) {
    this.includePaths = includePaths
    this.additionalData = additionalData
    this.webpackImporter = webpackImporter
    this.implementation = implementation
  }

  apply(compiler: webpack.Compiler) {
    const sassLoaderOptions = {
      // This enables the use of enhanced-resolve for @import statements prefixed with ~
      // but we don't usually use this and disabling it can speed up builds by up to 20%.
      webpackImporter: this.webpackImporter,
      // Prefer `dart-sass`.
      implementation: require(this.implementation),
      // Prepends SCSS code before the actual entry file.
      additionalData: this.additionalData,
      sassOptions: {
        // Disable formatting so that we don't spend time pretty printing
        outputStyle: 'compressed',
        // Enable Sass to @import source files from additional relative paths
        includePaths: this.includePaths
      }
    }

    const additionalCssLoaderOptions = {
      // sass-loader runs first
      // https://github.com/webpack-contrib/css-loader/blob/22e16e2fc88f920571219570953d3da5702d4fdb/README.md?plain=1#L920
      importLoaders: 1
    }

    new PageKitCssPlugin().apply(compiler)

    compiler.options.module.rules.push({
      test: [/\.sass|scss$/],
      issuer: {
        not: [/\.(js|ts)x?$/],
      },
      use: [
        // Load generated CSS using the same logic as
        // @financial-times/dotcom-build-css
        ...cssRule(additionalCssLoaderOptions),
        // Enable use of Sass for CSS preprocessing
        // https://github.com/webpack-contrib/sass-loader
        {
          loader: require.resolve('./monitored-sass-loader'),
          options: sassLoaderOptions
        }
      ]
    })
  }
}
