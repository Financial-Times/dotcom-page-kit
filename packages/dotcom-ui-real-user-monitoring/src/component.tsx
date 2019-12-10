// @ts-nocheck
import React from 'react'

/*
  Load performance observers for Real User Monitoring. 
  @SEE: 
   • https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics
   • https://github.com/GoogleChromeLabs/tti-polyfill#usage 
  
  @NOTE: 
   • This function is in ES5 syntax, because it run in the client. It needs to be ES5 so it's compatible with older browsers.
   • It's stringified and given to the client via "dangerouslySetInnerHTML" in a <script> tag.
   • It's not automatically compiled to ES5, because at this point it's server-side code, even though it runs in the client. 
*/

function javaScript() {
  if ('PerformanceLongTaskTiming' in window) {
    // @ts-ignore
    var timeToInteractive = (window.__tti = { entries: [] }) as any
    timeToInteractive.observer = new PerformanceObserver(function(entryTypes) {
      timeToInteractive.entries = timeToInteractive.entries.concat(entryTypes.getEntries())
    })
    timeToInteractive.observer.observe({ entryTypes: ['longtask', 'paint', 'navigation'] })
  }
}

export const RealUserMonitoring = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (${javaScript.toString()})()
        `
      }}
    />
  )
}
