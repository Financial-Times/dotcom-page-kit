import path from 'path'
import { App } from 'express'

/**
 * Inject metadata into the app
 *
 * @param app
 * @param options
 */
export const mount = (app: App, options = {}) => {
  const { name } = require(path.resolve('./package.json'))

  app.locals.appinfo = {
    name,
    environment: process.env.NODE_ENV,
    ...options
  }
}
