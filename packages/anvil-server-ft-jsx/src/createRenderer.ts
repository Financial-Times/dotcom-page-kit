import { RenderComponent, RenderContext } from './types'

export interface CreateRendererOptions {
  createElement: Function
  renderToString: Function
}

const defaultOptions: CreateRendererOptions = {
  createElement: new Function(),
  renderToString: new Function()
}

export default function createRenderer(userOptions: CreateRendererOptions) {
  const { createElement, renderToString } = { ...defaultOptions, ...userOptions }

  return (Component: RenderComponent, context?: RenderContext) => {
    return renderToString(createElement(Component, context))
  }
}
