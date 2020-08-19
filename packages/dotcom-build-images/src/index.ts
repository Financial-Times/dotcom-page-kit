const path = require('path')
const glob = require('glob')
const MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin')

export class PageKitImagesPlugin {
  basePath: string

  constructor(directory = './client') {
    this.basePath = directory
  }

  apply(compiler) {
    const imageFiles = glob.sync('**/*.{png,jpg,jpeg,gif,webp,ico,svg}', {
      absolute: true,
      cwd: path.resolve(this.basePath)
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

              const relativePath = path.relative(this.basePath, dirname)

              return path.join(relativePath, outputFileName)
            }
          }
        }
      ]
    })
  }
}
