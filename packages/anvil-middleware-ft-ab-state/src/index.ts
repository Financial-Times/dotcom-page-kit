export const init = () => {
  return (request, response, next) => {
    const abState = request.get('ft-ab') || ''
    response.locals.abState = abState

    next()
  }
}
