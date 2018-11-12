import webpack from 'webpack'
import ProgressPlugin from 'webpack/lib/ProgressPlugin'

interface Args {
  webpackConfig: AnyObject
  onProgress?: (value) => void
}

export function pack(args: Args) {
  return new Promise((resolve, reject) => {
    if (args.onProgress) {
      const progressHandler = new ProgressPlugin((percentage) => {
        const percentageValue = percentage * 100
        args.onProgress(percentageValue)
      })

      args.webpackConfig.plugins.push(progressHandler)
    }

    const compiler = webpack(args.webpackConfig)

    compiler.run((error, stats) => {
      if (error || stats.hasErrors()) {
        reject(new WebpackError(error, stats))
      } else {
        resolve()
      }
    })
  })
}

class WebpackError extends Error {
  details: any
  statsError: any
  constructor(error, stats) {
    super('Something went wrong')

    if (error && error.details) {
      this.details = error.details
    }

    if (error && error.stack) {
      this.stack
    }
    if (stats.hasErrors()) {
      const info = stats.toJson()
      this.statsError = info.errors
      this.message = info.errors.join(' - ')
    }
  }
}
