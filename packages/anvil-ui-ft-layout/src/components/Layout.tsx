import React from 'react'
import { Header, LogoOnly, Drawer, THeaderProps } from '@financial-times/anvil-ui-ft-header/component'
import { Footer, LegalFooter } from '@financial-times/anvil-ui-ft-footer/component'
import Template from './Template'

enum AnvilHeader {
  Standard = Header,
  Logo = LogoOnly
}

enum AnvilFooter {
  Standard = Footer,
  Legal = LegalFooter
}

export type TLayoutProps = {
  props: THeaderProps

  headerBefore?: string | React.ReactNode
  header?: AnvilHeader | React.ReactNode | false
  headerAfter?: string | React.ReactNode

  children?: React.ReactNode

  footerBefore?: string | React.ReactNode
  footer?: AnvilFooter | React.ReactNode | false
  footerAfter?: string | React.ReactNode
}

const headers = {
  simple: AnvilHeader.Standard,
  // This is the same as above but removing the "simple" variant will set
  // the logo to its default (large) size.
  home: AnvilHeader.Standard,
  'logo-only': AnvilHeader.Logo
}

const footers = {
  simple: AnvilFooter.Standard,
  legal: AnvilFooter.Legal
}

const getLayoutPreset = (
  header: TLayoutProps['header'] = 'simple',
  footer: TLayoutProps['footer'] = 'simple'
) => ({
  header: typeof header === 'string' ? headers[header] : null,
  footer: typeof footer === 'string' ? footers[footer] : null
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
