import createRenderer, { RendererOptions, RenderComponent } from './createRenderer'

type RenderCallback = (error?: Error, output?: string) => any

export default function createViewEngine(options: RendererOptions) {
  const renderer = createRenderer(options)

  return (viewPath: string, context: any, callback: RenderCallback): void => {
    const Component = interopRequire(viewPath) as RenderComponent

    if (typeof Component !== 'function') {
      callback(Error(`The module ${viewPath} requires a default export.`))
    }

    try {
      const output = renderer(Component, context)
      callback(null, output)
    } catch (error) {
      callback(error)
    }
  }
}

function interopRequire(path) {
  const obj = require(path)
  return obj && obj.__esModule ? obj['default'] : obj
}
