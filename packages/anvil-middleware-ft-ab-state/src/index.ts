export const init = () => {
  return (request, response, next) => {
    /**
     * An 'ft-ab' header is added to all requests during preflight
     */
    const abState = request.get('ft-ab') || ''
    response.locals.abState = abState

    next()
  }
}
