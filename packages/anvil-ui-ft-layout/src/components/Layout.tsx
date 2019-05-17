import React from 'react'
import {
  Header,
  LogoOnly,
  Drawer,
  THeaderOptions
} from '@financial-times/anvil-ui-ft-header/component'
import { TNavigationData } from '@financial-times/anvil-types-navigation'
import { Footer, LegalFooter, TFooterProps } from '@financial-times/anvil-ui-ft-footer/component'
import Template from './Template'

enum Headers {
  simple = Header,
  // This is the same as above but removing the "simple" name will set
  // the logo to its default (large) size.
  'large-logo' = Header,
  'logo-only' = LogoOnly
}

enum Footers {
  simple = Footer,
  legal = LegalFooter
}

export type TLayoutProps = {
  navigationData: TNavigationData
  headerOptions: THeaderOptions
  footerOptions: TFooterProps
  headerBefore?: string | React.ReactNode
  header?: Headers | React.ReactNode | false
  headerAfter?: string | React.ReactNode
  footerBefore?: string | React.ReactNode
  footer?: Footers | React.ReactNode | false
  footerAfter?: string | React.ReactNode
  children?: React.ReactNode
  contents?: string
}

const getLayoutPreset = (
  header: TLayoutProps['header'] = 'simple',
  footer: TLayoutProps['footer'] = 'simple'
) => ({
  header: typeof header === 'string' ? Headers[header] : null,
  footer: typeof footer === 'string' ? Footers[footer] : null
})

export function Layout({
  navigationData,
  headerOptions,
  footerOptions,
  headerBefore,
  header,
  headerAfter,
  footerBefore,
  footer,
  footerAfter,
  children,
  contents
}: TLayoutProps) {
  /**
   * Let consuming apps
   * a) Pass in custom components to render as Header or Footer
   * b) Pass false to switch them off
   */
  const Preset = getLayoutPreset(header, footer)

  return (
    <div className="n-layout">
      <a
        data-trackable="a11y-skip-to-help"
        className="n-layout__skip-link"
        href="https://www.ft.com/accessibility">
        Accessibility help
      </a>
      <a data-trackable="a11y-skip-to-navigation" className="n-layout__skip-link" href="#site-navigation">
        Skip to navigation
      </a>
      <a data-trackable="a11y-skip-to-content" className="n-layout__skip-link" href="#site-content">
        Skip to content
      </a>
      <a data-trackable="a11y-skip-to-footer" className="n-layout__skip-link" href="#site-footer">
        Skip to footer
      </a>

      <div className="n-layout__row n-layout__row--header">
        <Template>{headerBefore}</Template>
        {Preset.header ? <Preset.header {...headerOptions} data={navigationData} variant={header} /> : header}
        <Template>{headerAfter}</Template>
      </div>

      <div className="n-layout__row n-layout__row--content">
        <Template>{contents || children}</Template>
      </div>

      <div className="n-layout__row n-layout__row--footer">
        <Template>{footerBefore}</Template>
        {Preset.footer ? <Preset.footer {...footerOptions} data={navigationData} variant={footer} /> : footer}
        <Template>{footerAfter}</Template>
      </div>

      {/* Always render the drawer if there is a default header being used */}
      {Preset.header && <Drawer {...headerOptions} data={navigationData} />}
    </div>
  )
}

Layout.defaultProps = {
  header: 'simple',
  footer: 'simple',
  headerOptions: {},
  footerOptions: {}
}
