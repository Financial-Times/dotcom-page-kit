import React from 'react'

// Extend @types/react to support optional additional .getInitialProps() method.
// This is adapted from the @types/next:
// <https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/next/index.d.ts>

/**
 * Next.js style counterpart of React.FunctionComponent.
 *
 * @template P Component props.
 * @template C Context passed to getInitialProps.
 */
type NextFunctionComponent<P = {}, C = {}> = React.FunctionComponent<P> & NextStaticLifecycle<P, C>

/**
 * Next.js style counterpart of React.ComponentClass.
 *
 * @template P Component props.
 * @template C Context passed to getInitialProps.
 */
type NextComponentClass<P = {}, C = {}> = React.ComponentClass<P> & NextStaticLifecycle<P, C>

/**
 * Next.js style lifecycle methods.
 *
 * @template P Props returned from getInitialProps and passed to the component.
 * @template C Context passed to getInitialProps.
 */
interface NextStaticLifecycle<P, C> {
  getInitialProps?: (context: C) => Promise<P> | P
}

export type Renderable = NextComponentClass | NextFunctionComponent

export type RenderCallback = (error?: Error, output?: string) => any
