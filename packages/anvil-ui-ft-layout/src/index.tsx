import React from 'react'

type Props = {
  headerBefore?: string | React.Element
  header?: string | React.Element
  headerAfter?: string | React.Element
  children?: React.Element
  footerBefore?: string | React.Element
  footer?: string | React.Element
  footerAfter?: string | React.Element
}

function renderBlock(contents?: string | React.Element) {
  if (!contents) return null

  if (typeof contents === 'string') {
    return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: contents }} />
  } else {
    return <div style={{ display: 'contents' }}>{contents}</div>
  }
}

export default function FTLayout(props: Props) {
  return (
    <div className="n-layout">
      <div className="n-layout__row n-layout__row--header">
        {renderBlock(props.headerBefore)}
        {renderBlock(props.header)}
        {renderBlock(props.headerAfter)}
      </div>

      <div className="n-layout__row n-layout__row--content">{props.children}</div>

      <div className="n-layout__row n-layout__row--content">
        {renderBlock(props.footerBefore)}
        {renderBlock(props.footer)}
        {renderBlock(props.footerAfter)}
      </div>
    </div>
  )
}
