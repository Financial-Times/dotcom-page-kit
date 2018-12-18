import { createRenderer, RenderOptions, Options } from '../createRenderer'

/**
 * Returns an express compatible middleware that assigns a jsx renderer
 * to the `res.render` property
 *
 * @example
 * const app = express()
 * const renderer = createRendererMiddleware(options)
 * app.use(renderer)
 * app.get('/', (req, res) => { res.render(<HomePage />) })
 */
export function createRendererMiddleware(options: Options) {
  const render = createRenderer(options)
  return ({}, res, next) => {
    res.render = async (ComponentToRender: Function, renderOptions?: RenderOptions) => {
      const markup = await render(ComponentToRender, renderOptions)
      res.send(markup)
    }
    next()
  }
}
