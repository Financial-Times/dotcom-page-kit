import React from 'react'

import {
  HeaderDefault,
  HeaderSticky,
  LogoOnly,
  Drawer,
  THeaderProps
} from '@financial-times/anvil-ui-ft-header/component'
import { Footer, LegalFooter } from '@financial-times/anvil-ui-ft-footer/component'

export enum AnvilHeader {
  Standard = HeaderDefault,
  Sticky = HeaderSticky,
  Logo = LogoOnly
}

export enum AnvilFooter {
  Standard = Footer,
  Legal = LegalFooter
}

type TLayoutProps = {
  props: THeaderProps

  headerBefore?: string | React.ReactNode
  header?: AnvilHeader | React.ReactNode | string | false
  headerAfter?: string | React.ReactNode

  children?: React.ReactNode

  footerBefore?: string | React.ReactNode
  footer?: AnvilFooter | React.ReactNode | false
  footerAfter?: string | React.ReactNode
}

type TTemplateProps = {
  children?: string | React.ReactNode
  [rest: string]: any
}

export function Template(props: TTemplateProps) {
  const { children, ...rest } = props

  if (!children) return null

  if (typeof children === 'string') {
    return <div {...rest} dangerouslySetInnerHTML={{ __html: children }} />
  } else {
    return <div {...rest}>{children}</div>
  }
}

const headers = {
  standard: AnvilHeader.Standard,
  sticky: AnvilHeader.Sticky,
  logo: AnvilHeader.Logo
}

const footers = {
  standard: AnvilFooter.Standard,
  legal: AnvilFooter.Legal
}

const getPreset = (header: any = 'standard', footer: any = 'standard') => {
  return {
    header: headers[header],
    footer: footers[footer]
  }
}

export function Layout({
  props,
  header,
  headerBefore,
  headerAfter,
  footer,
  footerBefore,
  footerAfter,
  children
}: TLayoutProps) {
  /**
   * Let consuming apps
   * a) Pass in custom components to render as Header or Footer
   * b) Pass false to component props to switch them off
   */
  const Preset = getPreset(header, footer)

  return (
    <div className="n-layout">
      <div className="n-layout__row n-layout__row--header">
        <Template>{headerBefore}</Template>
        {Preset.header ? <Preset.header {...props} /> : header}
        <Template>{headerAfter}</Template>
      </div>

      <div className="n-layout__row n-layout__row--content">{children}</div>

      {!props.hideOutboundLinks && (
        <div className="n-layout__row n-layout__row--footer">
          <Template>{footerBefore}</Template>
          {Preset.footer ? <Preset.footer data={props.data.footer.items} /> : footer}
          <Template>{footerAfter}</Template>
        </div>
      )}
      {Preset.header && <Drawer {...props} />}
    </div>
  )
}
