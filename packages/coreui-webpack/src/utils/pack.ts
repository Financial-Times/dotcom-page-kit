import webpack from 'webpack'

export function pack(config: any) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
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
