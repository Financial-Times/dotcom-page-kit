const ManifestPlugin = require('webpack-manifest-plugin')

export interface Options {
  developmentPath?: string
  productionPath?: string
}

const defaults: Options = {
  developmentPath: 'public/',
  productionPath: '__assets/hashed/'
}

export function configuration(options: Options) {
  const opts = { ...defaults, ...options }

  const isProduction = process.env.NODE_ENV === 'production'

  return {
    plugins: [
      new ManifestPlugin({
        publicPath: isProduction ? opts.productionPath : opts.developmentPath
      })
    ]
  }
}
