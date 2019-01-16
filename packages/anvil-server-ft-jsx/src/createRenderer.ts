export interface RendererOptions {
  createElement: Function
  renderToString: Function
}

export type RenderComponent = any

export default function createRenderer({ renderToString, createElement }: RendererOptions) {
  return (Component: RenderComponent, context: any): string => {
    return renderToString(createElement(Component, context))
  }
}
