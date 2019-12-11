// @ts-ignore
import ttiPolyfill from 'tti-polyfill'

const inCohort = () => {
  // @TODO: return false for all but [n] percent of users
  // Unless it's forced to true via some mechanism for development purposes
  return true
}

const init = async () => {
  if (!inCohort()) return false
  if (!('PerformanceLongTaskTiming' in window)) return false

  console.log('PerformanceLongTaskTiming: Checks out.')

  // @ts-ignore
  const performance = (window.__tti = { entries: [] }) as any
  performance.observer = new PerformanceObserver((entryTypes) => {
    performance.entries = performance.entries.concat(entryTypes.getEntries())
  })

  // @SEE: https://w3c.github.io/performance-timeline/#observe-method
  const thingsToObserve = [
    { type: 'longtask', buffered: false },
    { type: 'paint', buffered: true },
    { type: 'navigation', buffered: true },
    { type: 'largest-contentful-paint', buffered: true }
  ]
  thingsToObserve.forEach(({ type, buffered }) => {
    performance.observer.observe({ type, buffered })
  })

  // This resolves after everything's done loading. I think.
  const timeToInteractive = await ttiPolyfill.getFirstConsistentlyInteractive()

  // @ts-ignore
  const { entries } = window.__tti

  // Get data from the navigation performance entry
  const { type, domInteractive, domComplete, responseStart, requestStart } = entries.find(
    (entry) => entry.entryType === 'navigation'
  )

  console.log({ type }) // if (type !== 'navigate') return

  const timeToFirstByte = responseStart - requestStart
  const firstPaint = entries.find((entry) => entry.name === 'first-paint').startTime

  // @SEE: https://wicg.github.io/largest-contentful-paint/#sec-example
  const largestContentfulPaintEntry = entries
    .filter((entry) => entry.entryType === 'largest-contentful-paint')
    .pop()

  const largestContentfulPaint =
    largestContentfulPaintEntry.renderTime || largestContentfulPaintEntry.loadTime

  const performanceContext = {
    timeToFirstByte,
    domInteractive,
    firstPaint,
    largestContentfulPaint,
    domComplete,
    timeToInteractive
  }
  console.table(performanceContext)

  // Disconnect the observer once it no longer needs to observe the performance data
  // @SEE: https://w3c.github.io/performance-timeline/#the-performanceobserver-interface
  performance.observer.disconnect()
}

export { init }
