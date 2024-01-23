import fs from 'fs'
import path from 'path'
import os from 'os'
import sassLoader from 'sass-loader'

class SassStats {
  #noticeStrategies = ['throttle', 'never', 'always']
  #noticeStrategy = this.#noticeStrategies.includes(process.env.FT_SASS_STATS_NOTICE)
    ? process.env.FT_SASS_STATS_NOTICE
    : 'throttle'
  #noticeThrottleSeconds =
    typeof process.env.FT_SASS_STATS_NOTICE_THROTTLE_SECONDS === 'number'
      ? process.env.FT_SASS_STATS_NOTICE_THROTTLE_SECONDS
      : 60 * 60 * 0.5 // show throttled notice given 30 mins since last notice
  #noticeThrottlePercentage =
    typeof process.env.FT_SASS_STATS_NOTICE_THROTTLE_PERCENTAGE === 'number'
      ? process.env.FT_SASS_STATS_NOTICE_THROTTLE_PERCENTAGE
      : 30 // show throttled notice given a 30% increase
  #stats = { totalTime: 0, noticeDate: null, totalTimeAtLastNotice: 0 }
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

  reportAccordingToNoticeStrategy = () => {
    let shouldReport

    switch (this.#noticeStrategy) {
      case 'never':
        shouldReport = false
        break

      case 'always':
        shouldReport = true
        break

      case 'throttle':
        // Throttle notices to show a limited number per hour, or if the total sass build time
        // has increased by a significant percentage. This favours more frequent reports to begin with.
        const noticeTimeThrottle = Date.now() >= this.#stats.noticeDate + this.#noticeThrottleSeconds * 1000
        const percentageTotalTimeThrottle =
          this.#stats.totalTime > 0 &&
          (this.#stats.totalTime / this.#stats.totalTimeAtLastNotice - 1) * 100 >=
            this.#noticeThrottlePercentage // % increase
        shouldReport = !this.#stats.noticeDate || noticeTimeThrottle || percentageTotalTimeThrottle
        break

      default:
        break
    }

    if (shouldReport) {
      this.#report()
    }
  }

  #report = () => {
    const seconds = this.#stats.totalTime / 1000
    const minutes = seconds / 60
    const hours = seconds / 3600
    const time =
      hours > 1
        ? `${hours.toFixed(1)} hours`
        : minutes > 1
        ? `${minutes.toFixed(0)} minutes`
        : `${seconds.toFixed(0)} seconds`
    const emoji =
      hours > 2 ? ['🔥', '😭', '😱'] : hours >= 1 ? ['🔥', '😱'] : minutes > 10 ? ['⏱️', '😬'] : ['⏱️']

    // eslint-disable-next-line no-console
    console.log(
      `\n\nYou have spent at least ${emoji.join(' ')} ${time} ${emoji
        .reverse()
        .join(' ')} waiting on FT Sass to compile.` +
        `\nLet's fix that! 🎉 https://origami.ft.com/blog/2024/01/24/sass-build-times/\n\n`
    )

    this.#write({ noticeDate: Date.now(), totalTimeAtLastNotice: this.#stats.totalTime })
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
        console.log(
          'dotcom-build-sass: Failed to monitor Sass build. Please report to #origami-support',
          error
        )
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
      localStats.reportAccordingToNoticeStrategy()
      return Reflect.apply(target, thisArg, argumentsList)
    })
  })
  sassLoaderThis.async = sassLoaderAsyncProxy
  // Run sass-loader as normal.
  return Reflect.apply(target, sassLoaderThis, argumentsList)
})

export default monitoredSassLoaderProxy
