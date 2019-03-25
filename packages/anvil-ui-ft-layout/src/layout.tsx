import React from 'react'

import { THeaderVariant } from '@financial-times/anvil-ui-ft-header'

type TLayoutProps = {
  headerBefore?: string | React.ReactNode
  header?: THeaderVariant | React.ReactNode
  headerAfter?: string | React.ReactNode
  children?: React.ReactNode
  footerBefore?: string | React.ReactNode
  footer?: string | React.ReactNode
  footerAfter?: string | React.ReactNode

  // @TODO: read from new `data` prop
  hideOutboundLinks: boolean
}

type TTemplateProps = {
  contents?: string | React.ReactNode
}

export function Template({ contents }: TTemplateProps) {
  if (!contents) return null

  if (typeof contents === 'string') {
    return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: contents }} />
  } else {
    return <div style={{ display: 'contents' }}>{contents}</div>
  }
}

export function Layout(props: TLayoutProps) {
  return (
    <div className="n-layout">
      <div className="n-layout__row n-layout__row--header">
        <Template contents={props.headerBefore} />
        <Template contents={props.header} />
        <Template contents={props.headerAfter} />
      </div>

      <main className="n-layout__row n-layout__row--content">{props.children}</main>

      {!props.hideOutboundLinks && (
        <div className="n-layout__row n-layout__row--content">
          <Template contents={props.footerBefore} />
          <Template contents={props.footer} />
          <Template contents={props.footerAfter} />
        </div>
      )}
    </div>
  )
}
