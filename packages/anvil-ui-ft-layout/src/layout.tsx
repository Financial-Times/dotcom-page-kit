import React from 'react'

type TLayoutProps = {
  headerBefore?: string | React.Element
  header?: string | React.Element
  headerAfter?: string | React.Element
  children?: React.Element
  footerBefore?: string | React.Element
  footer?: string | React.Element
  footerAfter?: string | React.Element
  hideOutboundLinks?: boolean
}

type TTemplateProps = {
  contents?: string | React.Element
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
