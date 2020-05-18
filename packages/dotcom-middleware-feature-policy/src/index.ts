import { Request, Response, NextFunction } from 'express'

// "wake-lock 'none'"
// "ambient-light-sensor 'none'"
// "document-write 'none'" // doesn't work :/

const FeaturesToRestrict = ["geolocation 'none'", "fullscreen 'none'", "usb 'none'", "accelerometer 'none'", "camera 'none'", "document-domain 'none'", "gyroscope 'none'", "microphone 'none'", "midi 'none'", "payment 'none'", "speaker 'none'", "sync-xhr 'none'" ]

export function init() {
  return (_: Request, response: Response, next: NextFunction) => {
    try {
      response.set('Feature-Policy', FeaturesToRestrict.join(','))
      next()
    } catch (error) {
      next(error)
    }
  }
}
