// @ts-ignore
import ttiPolyfill from 'tti-polyfill'

const init = async () => {
  const timeToInteractive = await ttiPolyfill.getFirstConsistentlyInteractive()

  // @ts-ignore
  const performanceTimeLine = window.__tti.entries.reduce((accumulator, entry) => {
    // attribution: [TaskAttributionTiming]
    const cindyLauper = {
      startTime: entry.startTime,
      endTime: entry.startTime + entry.duration,
      duration: entry.duration,
      entryType: entry.entryType,
      name: entry.name
    }
    accumulator.push(cindyLauper)
    return accumulator
  }, [])

  performanceTimeLine.push({
    name: 'time-to-interactive',
    startTime: 0,
    endTime: timeToInteractive
  })

  console.table(performanceTimeLine)
}

export { init }
