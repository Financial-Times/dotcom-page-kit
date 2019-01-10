import React from 'react'

interface Props {
  children?: any
}

export default function Footer({ children }: Props) {
  return <div>footer... {children}</div>
}
