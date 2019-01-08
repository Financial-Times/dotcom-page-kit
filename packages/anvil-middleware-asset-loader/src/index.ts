import path from 'path'
import { Handler } from 'express'
import { MiddlewareOptions } from './options'
import createMiddleware from './createMiddleware'
import createStaticHost from './createStaticHost'

const defaultOptions: MiddlewareOptions = {
  hostStaticAssets: false,
  publicPath: '/public',
  fileSystemPath: path.resolve('./public')
}

export function init(userOptions: MiddlewareOptions): Handler[] {
  const options: MiddlewareOptions = { ...defaultOptions, ...userOptions }

  const stack = [createMiddleware(options)]

  if (options.hostStaticAssets) {
    stack.push(createStaticHost(options))
  }

  return stack
}
