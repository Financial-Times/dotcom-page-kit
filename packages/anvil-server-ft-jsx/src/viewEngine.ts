import { RenderContext } from './types'
import createRenderer, { CreateRendererOptions } from './createRenderer'

export default (options?: CreateRendererOptions) => {
  const renderer = createRenderer(options)

  return (viewPath: string, context?: RenderContext): Promise<string> => {
    const ViewComponent = require(viewPath)
    return renderer(ViewComponent, context)
  }
}
