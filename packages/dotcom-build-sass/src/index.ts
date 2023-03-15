import { sassPlugin } from 'esbuild-sass-plugin'
import esbuild from 'esbuild'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export type TPluginOptions = {
  includePaths?: string[]
  prependData?: string
  webpackImporter?: boolean
}

export const pageKitSass = (options: TPluginOptions): esbuild.Plugin => {
  const autoprefixerOptions = {
    // https://github.com/browserslist/browserslist
    overrideBrowserslist: ['last 1 Chrome versions', 'Safari >= 13', 'ff ESR', 'last 1 Edge versions'],
    grid: true
  }

  // https://cssnano.co/guides/optimisations
  const cssnanoOptions = {
    preset: [
      'default',
      {
        // disable reduceInitial optimisation as `initial` is not supported in IE11
        // https://github.com/cssnano/cssnano/issues/721
        // https://developer.mozilla.org/en-US/docs/Web/CSS/initial
        reduceInitial: false
      }
    ]
  }

  return sassPlugin({
    loadPaths: ['node_modules', ...options.includePaths],
    async transform(source, _resolveDir, filePath) {
      const { css } = await postcss([autoprefixer(autoprefixerOptions), cssnano(cssnanoOptions)]).process(
        source,
        { from: filePath }
      )
      return css
    }
  })
}
