import React from 'react'

export type Renderable = string | Function | React.ReactNode

interface SlotProps {
  name: string
  Default?: any
}

export function placeholder() {
  return () => null
}

export function createSlotterFor(Constructor: Function, props: any) {
  return ({ name, Default }: SlotProps) => {
    const slot = props[`${name}Slot`] || getChildrenOfType(Constructor[name], props.children)
    if (!slot && Default) {
      return renderComponent(Default)
    } else if (slot) {
      return renderComponent(slot)
    }
    return null
  }
}

function renderComponent(Component: Renderable) {
  if (typeof Component === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: Component }} />
  } else if (typeof Component === 'function') {
    return <Component />
  } else if (typeof Component === 'object') {
    return <React.Fragment>{Component}</React.Fragment>
  }
}

function getChildrenOfType(type, children) {
  let result
  React.Children.forEach(children, (child) => {
    if (child.type === type) {
      result = child.props.children
    }
  })
  return result
}
