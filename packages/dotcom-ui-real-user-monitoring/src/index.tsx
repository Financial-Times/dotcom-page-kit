import React from 'react'

/*
  Load performance observers for Real User Monitoring. 
   • See: https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics
  
  @NOTE: 
   • This is in ES5 syntax, because it runs in the client. It needs to be ES5 so it's compatible with older browsers.
   • It's stringified and given to the client via "dangerouslySetInnerHTML" in a <script> tag.
   • It's not automatically compiled to ES5, because at this point it's server-side code, even though it runs in the client. 
*/
export const RealUserMonitoring = () => {
  function loadPerformanceObservers() {
    console.log('Testing: loadPerformanceObservers()')
    
    // if('PerformanceLongTaskTiming' in window){
    //   console.log("Broadcast: PerformanceLongTaskTiming")
    //   var g=window.__tti={e:[]};
    // }
  
    if('PerformanceObserver' in window){
      var performanceObserver = new PerformanceObserver(function(entryTypes){
        var entries = entryTypes.getEntries()
        for (var i=0; i<=entries.length; i++) {
          var entry = entries[i]
          console.table(entry)
        }
      });
      var entryTypes = ['paint','longtask', 'navigation']
      performanceObserver.observe({ entryTypes })
    }
  }
    
  return (
    <script dangerouslySetInnerHTML={{ __html: '(' + loadPerformanceObservers.toString() + ')()' }} />
  )
}
