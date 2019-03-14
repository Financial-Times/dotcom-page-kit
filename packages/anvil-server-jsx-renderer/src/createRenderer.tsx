import React from 'react'
import { Shell } from '@financial-times/anvil-ui-ft-shell'
import { AnyObject } from '@financial-times/anvil-types-generic'
import { renderToStaticMarkup } from 'react-dom/server'

export interface Options {
  /**
   * The component that is used to
   * render the html document shell
   * @default @financial-times/anvil-ui-ft-shell
   * */
  shellComponent: Function

  /**
   * The function to use to render the component
   * @default react-dom/server#renderToStaticMarkup
   */
  renderFn: Function

  /**
   * List of script files to load by default
   */
  scriptsToLoad: string[]
}

export interface RenderOptions {
  /**
   * The initial props that should be passed to the component
   */
  props?: AnyObject

  /**
   * The component that is used to
   * render the html document shell
   * */
  shellComponent?: Function

  /**
   * List of script files to load by default
   */
  scriptsToLoad?: string[]
}

const defaultOptions: Options = {
  scriptsToLoad: [],
  renderFn: renderToStaticMarkup,
  shellComponent: Shell
}

/**
 * Creates a renderer that can be used on the server to render JSX components
 *
 * @example
 * const render = createRenderer(options)
 *
 * app.get('/', (req, res) => { res.send(render(<HomePage greeting="hello" />)) })
 *
 * or
 *
 * app.get('/', (req, res) => { res.send(render(HomePage, { props: {greeting: hello} })) })
 */
export function createRenderer(userOptions: Partial<Options> = {}) {
  const options = { ...defaultOptions, ...userOptions }

  return async (Component: Function | Object, renderOptions: RenderOptions = {}) => {
    const Shell = renderOptions.shellComponent || options.shellComponent
    const initialProps = renderOptions.props || (await getInitialPropsFrom(Component))
    const scriptsToLoad = renderOptions.scriptsToLoad || options.scriptsToLoad
    const componentIsObject = typeof Component === 'object'
    const ComponentToRender = Component as Function

    const markup = options.renderFn(
      <Shell initialProps={initialProps} scriptsToLoad={scriptsToLoad}>
        {componentIsObject ? Component : <ComponentToRender {...initialProps} />}
      </Shell>
    )

    return `<!DOCTYPE html>${markup}`
  }
}

async function getInitialPropsFrom(Component) {
  if (Component.getInitialProps) {
    return await Component.getInitialProps()
  } else return {}
}
