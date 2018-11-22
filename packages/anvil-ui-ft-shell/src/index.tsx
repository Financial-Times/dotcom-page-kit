import React from 'react'

interface Props {
  children: any
}

export default function Shell({ children }: Partial<Props>) {
  return <div>{children}</div>
}
