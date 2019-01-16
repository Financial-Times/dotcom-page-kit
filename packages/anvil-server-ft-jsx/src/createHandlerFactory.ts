import createRenderer, { RendererOptions, RenderComponent } from './createRenderer'
import { Request, Response, NextFunction } from 'express'

export default function createHandlerFactory(options: RendererOptions) {
  const renderer = createRenderer(options)

  return (Component: RenderComponent) => {
    return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
      let context

      try {
        if (typeof Component.getInitialProps === 'function') {
          context = await Component.getInitialProps({ ...context, request, response })
        }

        const output = renderer(Component, context)
        response.send(output)
      } catch (error) {
        next(error)
      }
    }
  }
}
