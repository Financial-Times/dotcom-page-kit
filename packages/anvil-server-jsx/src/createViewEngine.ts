import createRenderer, { RendererOptions, RenderComponent } from './createRenderer'

type RenderCallback = (error?: Error, output?: string) => any

export default function createViewEngine(options: RendererOptions) {
  const renderer = createRenderer(options)

  return async (componentPath: string, context: any, callback: RenderCallback): Promise<void> => {
    try {
      const Component = interopRequire(componentPath) as RenderComponent

      if (typeof Component !== 'function') {
        throw Error(`The module ${componentPath} requires a default export.`)
      }

      const output = await renderer(Component, context, true)

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
