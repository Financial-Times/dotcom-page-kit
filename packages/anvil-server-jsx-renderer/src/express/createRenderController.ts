import { createRenderer, Options } from '../createRenderer'

/**
 * Returns a function that can be used to create and express
 * compatible controller function that renders a JSX component
 *
 * @example
 * const app = express()
 * const render = createRenderController(options)
 * app.get('/', render(<HomePage />))
 */
export function createRenderController(options: Options) {
  const render = createRenderer(options)
  return (Component) => {
    return async ({}, res, next) => {
      try {
        const markup = await render(Component)
        res.send(markup)
      } catch (error) {
        next(error)
      }
    }
  }
}
