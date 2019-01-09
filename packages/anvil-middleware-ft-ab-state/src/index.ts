import TestStatus from './TestStatus'

export const init = () => {
  return (request, response, next) => {
    /**
     * An 'ft-ab' header is added to all requests during preflight
     */
    const testList = request.get('ft-ab') || ''
    response.locals.abState = new TestStatus({ testList })

    next()
  }
}
