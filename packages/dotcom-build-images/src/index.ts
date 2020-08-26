const path = require('path')
const glob = require('glob')
const MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin')

export class PageKitImagesPlugin {
  options: { basePath: string }

  constructor(options = {}) {
    this.options = {
      basePath: './client',
      ...options
    }
  }

  apply(compiler) {
    const imageFiles = glob.sync('**/*.{png,jpg,jpeg,gif,webp,ico,svg}', {
      absolute: true,
      cwd: path.resolve(this.options.basePath)
    })

    new MultiEntryPlugin(compiler.context, imageFiles, '__images__').apply(compiler)

    const isDevMode = compiler.options.mode === 'development'
    const outputFileName = isDevMode ? '[name].[ext]' : '[name].[contenthash:12].[ext]'

    compiler.options.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|ico|svg)$/,
      use: [
        {
          loader: require.resolve('file-loader'),
          options: {
            name: (resourcePath) => {
              const dirname = path.dirname(resourcePath)
              const relativePath = path.relative(this.options.basePath, dirname)

              // retain relative directory structure
              return path.join(relativePath, outputFileName)
            }
          }
        }
      ]
    })
  }
}
