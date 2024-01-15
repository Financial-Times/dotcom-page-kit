import fs from 'fs'
import path from 'path'
import os from 'os'
import sassLoader from 'sass-loader'

class SassStats {
  #noticeThrottle = 10 * 1000
  #stats = { totalTime: 0, notice: null }
  #directory = path.join(os.tmpdir(), 'dotcom-build-sass')
  #file = path.join(this.#directory, 'sass-stats.json')
  #startTime

  constructor() {
    fs.mkdirSync(path.dirname(this.#directory), { recursive: true })
  }

  start = () => {
    this.#read()
    this.#startTime = performance.now()
  }

  end = () => {
    const endTime = performance.now()
    const updatedTotal = (this.#stats.totalTime += endTime - this.#startTime)
    this.#write({ totalTime: updatedTotal })
  }

  #read = () => {
    try {
      // Restore stats from a temporary file if it exists.
      // Reading from disk ensures that we can track stats across builds.
      const statsFile = fs.readFileSync(this.#file, 'utf-8')
      this.#stats = JSON.parse(statsFile)
    } catch {}
    return this.#stats
  }

  #write = (stats) => {
    this.#stats = Object.assign(this.#stats, stats)
    fs.writeFileSync(this.#file, JSON.stringify(this.#stats))
  }

  throttledReport = () => {
    if (!this.#stats.notice || this.#stats.notice < Date.now() - this.#noticeThrottle) {
      this.#write({ notice: Date.now() })
      this.#report()
    }
  }

  #report = () => {
    const seconds = Math.floor(this.#stats.totalTime / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(seconds / 3600)
    const time = hours > 2 ? `${hours} hours` : minutes > 2 ? `${minutes} minutes` : `${seconds} seconds`

    // eslint-disable-next-line no-console
    console.log(
      `\n\nYou have spent at least 🔥😱 ${time} 😱🔥 waiting on FT Sass to compile.` +
        `\nLet's fix that! 🎉 [link to support to optimise / remove Sass]\n\n`
    )
  }
}

// We're proxying a few functions for monitoring purposes,
// we want to catch any monitoring errors silently.
const forgivingProxy = (target, task) => {
  return new Proxy(target, {
    apply(...args) {
      try {
        return task(...args)
      } catch (error) {
        Reflect.apply(...args)
        // eslint-disable-next-line no-console
        console.log('dotcom-build-sass: Failed to monitor Sass build.', error)
      }
    }
  })
}

const localStats = new SassStats()
const monitoredSassLoaderProxy = forgivingProxy(sassLoader, (target, sassLoaderThis, argumentsList) => {
  // Start the timer, sass-loader has been called with Sass content.
  // https://github.com/webpack-contrib/sass-loader/blob/03773152760434a2dd845008c504a09c0eb3fd91/src/index.js#L19
  localStats.start()
  // Assign our proxy to sass-loaders async function.
  // https://github.com/webpack-contrib/sass-loader/blob/03773152760434a2dd845008c504a09c0eb3fd91/src/index.js#L29
  const sassLoaderAsyncProxy = forgivingProxy(sassLoaderThis.async, (target, thisArg, argumentsList) => {
    // Run sass-loader's async function as normal.
    // Proxy the callback it returns.
    // https://github.com/webpack-contrib/sass-loader/blob/03773152760434a2dd845008c504a09c0eb3fd91/src/index.js#L113
    const sassLoaderCallback = Reflect.apply(target, thisArg, argumentsList)
    return forgivingProxy(sassLoaderCallback, (target, thisArg, argumentsList) => {
      // sass-loader's callback has been... called.
      // Either we have sass, or the build failed.
      localStats.end()
      localStats.throttledReport()
      return Reflect.apply(target, thisArg, argumentsList)
    })
  })
  sassLoaderThis.async = sassLoaderAsyncProxy
  // Run sass-loader as normal.
  return Reflect.apply(target, sassLoaderThis, argumentsList)
})

export default monitoredSassLoaderProxy
