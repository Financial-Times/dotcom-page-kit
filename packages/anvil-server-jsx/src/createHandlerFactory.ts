import createRenderer, { RendererOptions, RenderComponent } from './createRenderer'
import { Request, Response, NextFunction } from 'express'

export default function createHandlerFactory(options: RendererOptions) {
  const renderer = createRenderer(options)

  return (Component: RenderComponent) => {
    return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
      try {
        const context = { request, response }
        const output = await renderer(Component, context, true)

        response.send(output)
      } catch (error) {
        next(error)
      }
    }
  }
}
