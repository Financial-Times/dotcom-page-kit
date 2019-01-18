export interface RendererOptions {
  createElement: Function
  renderToString: Function
}

export type RenderComponent = Function | any

export default function createRenderer({ renderToString, createElement }: RendererOptions) {
  return async (Component: RenderComponent, context: any, includeDoctype: boolean): Promise<string> => {
    if (typeof Component.getInitialProps === 'function') {
      context = await Component.getInitialProps(context)
    }

    const outputPrefix = includeDoctype ? '<!DOCTYPE html>' : ''

    return outputPrefix + renderToString(createElement(Component, context))
  }
}
