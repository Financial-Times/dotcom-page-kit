import express, { Handler } from 'express'
import { MiddlewareOptions } from './options'

export default (options: MiddlewareOptions): Handler => {
  const router = express.Router()
  router.use(options.publicPath, express.static(options.fileSystemPath))
  return router
}
