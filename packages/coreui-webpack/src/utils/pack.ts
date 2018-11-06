import webpack from 'webpack'
import { AnyObject } from 'coreui-common'
import ProgressPlugin from 'webpack/lib/ProgressPlugin'

interface Args {
  webpackConfig: AnyObject
  onProgress?: (value) => void
}

export function pack(args: Args) {
  return new Promise((resolve, reject) => {
    if (args.onProgress) {
      const progressHandler = new ProgressPlugin(function(percentage) {
        const percentageValue = percentage * 100
        args.onProgress(percentageValue)
      })
      args.webpackConfig.plugins.push(progressHandler)
    }

    const compiler = webpack(args.webpackConfig)

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
