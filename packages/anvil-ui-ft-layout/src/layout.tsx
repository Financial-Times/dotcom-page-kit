import React from 'react'

import {
  HeaderDefault,
  HeaderSticky,
  LogoOnly,
  Drawer,
  THeaderVariant,
  TFooterVariant,
  THeaderProps
} from '@financial-times/anvil-ui-ft-header/component'
import { Footer, LegalFooter } from '@financial-times/anvil-ui-ft-footer/component'

type TLayoutProps = {
  props: THeaderProps

  headerBefore?: string | React.ReactNode
  header?: THeaderVariant | React.ReactNode
  headerAfter?: string | React.ReactNode

  children?: React.ReactNode

  footerBefore?: string | React.ReactNode
  footer?: TFooterVariant | React.ReactNode
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

export const getPresetComponents = (header: THeaderVariant = 'simple', footer: TFooterVariant = 'simple') => {
  const headers = {
    simple: HeaderDefault,
    home: HeaderDefault,
    sticky: HeaderSticky,
    'logo-only': LogoOnly
  }

  const footers = {
    simple: Footer,
    legal: LegalFooter
  }

  return {
    header: headers[header],
    drawer: Drawer,
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
  const Preset = getPresetComponents(header, footer)

  return (
    <div className="n-layout">
      <div className="n-layout__row n-layout__row--header">
        <Template>{headerBefore}</Template>
        {Preset.header ? <Preset.header {...props} /> : header}
        <Template>{headerAfter}</Template>
      </div>

      <main className="n-layout__row n-layout__row--content">{children}</main>

      {!props.hideOutboundLinks && (
        <div className="n-layout__row n-layout__row--content">
          <Template>{footerBefore}</Template>
          <div className="n-layout__row n-layout__row--footer">
            {Preset.footer ? <Preset.footer data={props.data.footer.items} /> : footer}
          </div>
          <Template>{footerAfter}</Template>
        </div>
      )}
      {Preset.header && Preset.drawer && <Preset.drawer {...props} />}
    </div>
  )
}
