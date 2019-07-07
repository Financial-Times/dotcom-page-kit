import webpack from 'webpack'
import { TWebpackConfig } from '../types/HandlerArgs'
import ProgressPlugin from 'webpack/lib/ProgressPlugin'

interface OnProgress {
  (percentageValue: number): void
}

interface OnWatchError {
  (error?: Error): void
}

interface Args {
  stdin?: boolean
  watch: boolean
  webpackConfig: TWebpackConfig
  onProgress?: OnProgress
  onComplete?: Function
  onWatching?: Function
  onWatchEnd?: Function
  onWatchError?: OnWatchError
}

export async function pack({
  webpackConfig,
  onProgress,
  onComplete,
  onWatching,
  onWatchEnd,
  onWatchError,
  watch = false,
  stdin = false
}: Args) {
  if (onProgress) {
    webpackConfig.plugins.push(createProgressHandler(onProgress))
  }

  const compiler = webpack(webpackConfig)

  if (watch) {
    await compileInWatchMode(compiler, onWatching, onWatchEnd, onWatchError, stdin)
  } else await compileWithoutWatching(compiler, onComplete)
}

function compileWithoutWatching(compiler, onComplete: Function = () => {}) {
  return new Promise((resolve, reject) => {
    compiler.run((error, stats) => {
      if (error || stats.hasErrors()) {
        reject(new WebpackError(error, stats))
      } else {
        onComplete()
        resolve()
      }
    })
  })
}

function compileInWatchMode(
  compiler,
  onWatching: Function = () => {},
  onWatchEnd: Function = () => {},
  onWatchError: OnWatchError = () => {},
  stdin = false
) {
  new Promise((resolve, reject) => {
    const watching = compiler.watch({}, (err, stats) => {
      if (err || stats.hasErrors()) {
        const error = new WebpackError(err, stats)
        onWatchError(error)
        reject(new WebpackError(error, stats))
      } else {
        if (stdin) {
          // NOTE: This has to be declared with an arrow function
          // because of https://github.com/electron/electron/issues/9626
          process.on('exit', () => onWatchEnd())
          process.on('SIGINT', closeWatcher)
        }
        onWatching()
        resolve()
      }
    })

    function closeWatcher() {
      watching.close(() => {
        process.exit()
      })
    }
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
