const path = require('path')
const glob = require('glob')
const EntryPlugin = require('webpack/lib/EntryPlugin')

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

    for (const imageFile of imageFiles) {
      new EntryPlugin(compiler.context, imageFile, '__images__').apply(compiler)
    }

    const isDevMode = compiler.options.mode === 'development'
    const outputFileName = isDevMode ? '[name][ext]' : '[name].[contenthash:12][ext]'

    compiler.options.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|ico|svg)$/,
      type: 'asset/resource',
      generator: {
        filename: (pathInfo) => {
          const dirname = path.dirname(pathInfo.module.resource)
          const relativePath = path.relative(this.options.basePath, dirname)

          // retain relative directory structure
          return path.join(relativePath, outputFileName)
        }
      }
    })
  }
}
