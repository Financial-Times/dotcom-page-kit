declare global {
  interface Window {
    LUX: Performance
    msPerformance: any
    webkitPerformance: any
    mozPerformance: any
  }
}

export default (name) => {
  const performance =
    window.LUX ||
    window.performance ||
    window.msPerformance ||
    window.webkitPerformance ||
    window.mozPerformance
  if (performance && (performance as Performance).mark) {
    ;(performance as Performance).mark(name)
  }
}
