import TestStatus from './TestStatus'
import { Handler, Request, Response, NextFunction } from 'express'

export const init = (): Handler => {
  return (request: Request, response: Response, next: NextFunction) => {
    /**
     * An 'ft-ab' header is added to all requests during preflight
     */
    const testList = request.get('ft-ab') || ''
    response.locals.abState = new TestStatus({ testList })

    next()
  }
}
