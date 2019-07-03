import React from 'react'

type TTemplateProps = {
  children?: string | React.ReactNode
  [rest: string]: any
}

export default function Template(props: TTemplateProps) {
  const { children, ...rest } = props

  if (!children) return null

  if (typeof children === 'string') {
    return <div {...rest} dangerouslySetInnerHTML={{ __html: children }} />
  } else {
    return <div {...rest}>{children}</div>
  }
}
