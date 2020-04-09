import { Request, Response, NextFunction } from 'express'

const FeaturesToRestrict = ["geolocation 'none'", "fullscreen 'none'"]

export function init() {
  return async (_: Request, response: Response, next: NextFunction) => {
    try {
      response.set('Feature-Policy', FeaturesToRestrict.join(','))
      next()
    } catch (error) {
      next(error)
    }
  }
}
