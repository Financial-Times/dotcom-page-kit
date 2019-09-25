import React from 'react'
import { Header, LogoOnly, Drawer, THeaderOptions } from '@financial-times/dotcom-ui-header/component'
import { TNavigationData } from '@financial-times/dotcom-types-navigation'
import { Footer, LegalFooter, TFooterOptions } from '@financial-times/dotcom-ui-footer/component'
import { loadCustomFontsJS } from '@financial-times/dotcom-core-branding'
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
  headerBefore?: string | React.ReactNode
  header?: Headers | React.ReactNode | false
  headerAfter?: string | React.ReactNode
  footerOptions: TFooterOptions
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

// EnhanceFonts removes the default o-typography--loading-* styles
// allowing the custom fonts Finacier and MetricWeb to be shown.
// An immediately invoked function expression is embedded in the DOM as a string
const EnhanceFonts = () => {
  return <script dangerouslySetInnerHTML={{ __html: loadCustomFontsJS }} />
}

export function Layout({
  navigationData,
  headerOptions,
  headerBefore,
  header,
  headerAfter,
  footerOptions,
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
    <div
      className="n-layout o-typography--loading-sans o-typography--loading-sansBold o-typography--loading-display o-typography--loading-displayBold"
      data-o-component="o-typography">
      <EnhanceFonts />
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
        <Template className="n-layout__header-before">{headerBefore}</Template>
        {Preset.header ? <Preset.header {...headerOptions} data={navigationData} variant={header} /> : header}
        <Template className="n-layout__header-after">{headerAfter}</Template>
      </div>

      <div className="n-layout__row n-layout__row--content">
        <Template>{contents || children}</Template>
      </div>

      <div className="n-layout__row n-layout__row--footer">
        <Template className="n-layout__footer-before">{footerBefore}</Template>
        {Preset.footer ? <Preset.footer {...footerOptions} data={navigationData} variant={footer} /> : footer}
        <Template className="n-layout__footer-after">{footerAfter}</Template>
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
