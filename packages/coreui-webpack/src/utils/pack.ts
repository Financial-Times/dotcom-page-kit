import webpack from 'webpack'
import ProgressPlugin from 'webpack/lib/ProgressPlugin'

interface AnyObject {
  // TODO: Put this in coreui-common
  [key: string]: any
}

interface Args {
  webpackConfig: AnyObject
  onProgress?: (value) => void
}

export function pack(a: Args) {
  return new Promise((resolve, reject) => {
    if (a.onProgress) {
      const progressHandler = new ProgressPlugin(function(percentage, msg) {
        const percentageValue = percentage * 100
        a.onProgress(percentageValue)
      })
      a.webpackConfig.plugins.push(progressHandler)
    }

    const compiler = webpack(a.webpackConfig)

    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        const error = new WebpackError(err, stats)
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

class WebpackError extends Error {
  details: any
  statsError: any
  constructor(err, stats) {
    super('Something went wrong')

    if (err && err.details) {
      this.details = err.details
    }

    if (err && err.stack) {
      this.stack
    }
    if (stats.hasErrors()) {
      const info = stats.toJson()
      this.statsError = info.errors
      this.message = info.errors.join(' - ')
    }
  }
}

// TODO: Move this to a webpack libs package
