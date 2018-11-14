import webpack from 'webpack'
import { AnyObject } from '@financial-times/anvil-types-generic'
import ProgressPlugin from 'webpack/lib/ProgressPlugin'

interface OnProgress {
  (percentageValue: number): void
}
interface Args {
  webpackConfig: AnyObject
  onProgress?: OnProgress
}

export function pack({ webpackConfig, onProgress }: Args) {
  return new Promise((resolve, reject) => {
    if (onProgress) {
      webpackConfig.plugins.push(createProgressHandler(onProgress))
    }

    const compiler = webpack(webpackConfig)

    compiler.run((error, stats) => {
      if (error || stats.hasErrors()) {
        reject(new WebpackError(error, stats))
      } else {
        resolve()
      }
    })
  })
}

function createProgressHandler(onProgress: OnProgress) {
  return new ProgressPlugin((percentage) => {
    const percentageValue = percentage * 100
    onProgress(percentageValue)
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
      this.stack = error.stack
    }
    if (stats.hasErrors()) {
      const info = stats.toJson()
      this.statsError = info.errors
      this.message = info.errors.join(' - ')
    }
  }
}
