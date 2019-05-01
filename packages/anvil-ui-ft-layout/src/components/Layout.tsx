import React from 'react'
import { Header, LogoOnly, Drawer, THeaderProps } from '@financial-times/anvil-ui-ft-header/component'
import { Footer, LegalFooter } from '@financial-times/anvil-ui-ft-footer/component'
import Template from './Template'

enum Headers {
  simple = Header,
  // This is the same as above but removing the "simple" variant will set
  // the logo to its default (large) size.
  home = Header,
  'logo-only' = LogoOnly
}

enum Footers {
  simple = Footer,
  legal = LegalFooter
}

export type TLayoutProps = {
  props: THeaderProps

  headerBefore?: string | React.ReactNode
  header?: Headers | React.ReactNode | false
  headerAfter?: string | React.ReactNode

  children?: React.ReactNode

  footerBefore?: string | React.ReactNode
  footer?: Footers | React.ReactNode | false
  footerAfter?: string | React.ReactNode
}

const getLayoutPreset = (
  header: TLayoutProps['header'] = 'simple',
  footer: TLayoutProps['footer'] = 'simple'
) => ({
  header: typeof header === 'string' ? Headers[header] : null,
  footer: typeof footer === 'string' ? Footers[footer] : null
})

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
   * b) Pass false to switch them off
   */
  const Preset = getLayoutPreset(header, footer)

  return (
    <div className="n-layout">
      <div className="n-layout__row n-layout__row--header">
        <Template>{headerBefore}</Template>
        {Preset.header ? <Preset.header {...props} variant={header} /> : header}
        <Template>{headerAfter}</Template>
      </div>

      <div className="n-layout__row n-layout__row--content">{children}</div>

      <div className="n-layout__row n-layout__row--footer">
        <Template>{footerBefore}</Template>
        {Preset.footer ? <Preset.footer data={props.data.footer.items} variant={footer} /> : footer}
        <Template>{footerAfter}</Template>
      </div>

      {/* Always render the drawer if there is a default header being used */}
      {Preset.header && <Drawer {...props} />}
    </div>
  )
}

Layout.defaultProps = {
  header: 'simple',
  footer: 'simple'
}
