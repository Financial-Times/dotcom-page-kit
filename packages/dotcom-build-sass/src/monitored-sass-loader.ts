import fs from 'fs'
import path from 'path'
import os from 'os'
import sassLoader from 'sass-loader'
import https from 'https'

const logError = (message) => {
  // eslint-disable-next-line no-console
  console.log(
    `\n⛔️😭dotcom-build-sass: ${message}. Please report to #origami-support in Slack, so we can help move us away from Sass.\n`
  )
}

class SassStats {
  #monitorRemotely = process.env.FT_SASS_STATS_MONITOR === 'on'
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
  #endTime
  buildCount: number = 0

  constructor() {
    fs.mkdirSync(this.#directory, { recursive: true })
  }

  start = () => {
    this.#read()
    this.#startTime = performance.now()
  }

  end = () => {
    this.#endTime = performance.now()
    const updatedTotal = (this.#stats.totalTime += this.#endTime - this.#startTime)
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

  sendMetric = () => {
    if (!this.#monitorRemotely) {
      return
    }

    if (!process.env.FT_SASS_BIZ_OPS_API_KEY) {
      logError(
        'We couldn\'t share your Sass build time, we\'re missing the environment variable "FT_SASS_BIZ_OPS_API_KEY". Please contact #origami-support with any questions.'
      )
      return
    }
    if (!process.env.FT_SASS_BIZ_OPS_SYSTEM_CODE) {
      logError(
        'We couldn\'t share your Sass build time, we\'re missing the environment variable "FT_SASS_BIZ_OPS_SYSTEM_CODE". Please contact #origami-support with any questions.'
      )
      return
    }

    const date = new Date()
    const postData = JSON.stringify({
      type: 'System',
      metric: 'sass-build-time',
      value: (this.#endTime - this.#startTime) / 1000,
      date: date.toISOString(),
      code: process.env.FT_SASS_BIZ_OPS_SYSTEM_CODE,
      metadata: {
        'node-env': process.env.NODE_ENV
      }
    })

    const options = {
      hostname: 'api.ft.com',
      port: 443,
      path: '/biz-ops-metrics/metric/add',
      method: 'POST',
      headers: {
        'x-api-key': process.env.FT_SASS_BIZ_OPS_API_KEY,
        'client-id': 'page-kit',
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    }

    const request = https
      .request(options, (response) => {
        if (response.statusCode !== 200) {
          logError(
            `We couldn\'t send your Sass build time metrics to biz-ops. Status code: ${response.statusCode}.`
          )
        }
      })
      .on('error', (error) => {
        logError(`We couldn\'t send your Sass build time metrics to biz-ops. Error: ${error}.`)
      })
    request.write(postData)
    request.end()
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

    let cta =
      `Share your high score in Slack #sass-to-css 🎉 And help us improve that:\n` +
      `https://origami.ft.com/blog/2024/01/24/sass-build-times/\n\n`

    if (!this.#monitorRemotely) {
      cta =
        `Help us improve build times by setting the "FT_SASS_STATS_MONITOR" environment variable.\n` +
        `https://origami.ft.com/blog/2024/01/24/sass-build-times/ \n\n`
    }

    // eslint-disable-next-line no-console
    console.log(
      `\n\ndotcom-build-sass:\nYou have spent at least ${emoji.join(' ')} ${time} ${emoji
        .reverse()
        .join(' ')} waiting on FT Sass to compile.\n${cta}`
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
        logError(`Failed to monitor Sass build. Error: ${error}`)
      }
    }
  })
}

const stats = new SassStats()
const monitoredSassLoaderProxy = forgivingProxy(sassLoader, (target, sassLoaderThis, argumentsList) => {
  stats.buildCount++
  // Start the timer, sass-loader has been called with Sass content.
  // https://github.com/webpack-contrib/sass-loader/blob/03773152760434a2dd845008c504a09c0eb3fd91/src/index.js#L19
  if (stats.buildCount === 1) {
    stats.start()
  }

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
      stats.buildCount--
      if (stats.buildCount === 0) {
        stats.end()
        stats.reportAccordingToNoticeStrategy()
        stats.sendMetric()
      }
      return Reflect.apply(target, thisArg, argumentsList)
    })
  })
  sassLoaderThis.async = sassLoaderAsyncProxy
  // Run sass-loader as normal.
  return Reflect.apply(target, sassLoaderThis, argumentsList)
})

export default monitoredSassLoaderProxy
