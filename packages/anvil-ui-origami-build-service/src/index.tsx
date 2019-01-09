import React from 'react'
import { Helmet } from 'react-helmet'
import { AnyObject } from '@financial-times/anvil-types-generic'

declare global {
  interface Window {
    Origami: AnyObject
  }
}

interface Dependencies {
  [key: string]: string
}

interface Props {
  children: any
  dependencies: Dependencies
}

export class OrigamiBuildService extends React.Component<Props, {}> {
  props: Props
  initialised = []

  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    if (window.hasOwnProperty('Origami')) {
      for (const component in window.Origami) {
        if (typeof window.Origami[component].init === 'function') {
          const instance = window.Origami[component].init()
          this.initialised.concat(instance)
        }
      }
    }
  }

  componentWillUnmount() {
    this.initialised.forEach((instance) => {
      if (typeof instance.destroy === 'function') {
        instance.destroy()
      }
    })
  }

  render() {
    const js = buildServiceUrl(this.props.dependencies, 'js')
    const css = buildServiceUrl(this.props.dependencies, 'css')

    return (
      <React.Fragment>
        <Helmet>
          <script src={js} />
          <link rel="stylesheet" href={css} />
        </Helmet>
        {this.props.children}
      </React.Fragment>
    )
  }
}

function buildServiceUrl(deps, type) {
  const modules = Object.keys(deps)
    .map((i) => `${i}@${deps[i]}`)
    .join(',')
  return `https://www.ft.com/__origami/service/build/v2/bundles/${type}?modules=${modules}`
}
