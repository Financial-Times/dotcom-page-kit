import React from 'react'

interface Props {
  children?: any
}

export default function FTHeader({ children }: Props) {
  return <div>header... {children}</div>
}
