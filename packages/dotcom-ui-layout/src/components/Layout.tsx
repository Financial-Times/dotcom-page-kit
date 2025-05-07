import React from 'react'
import {
  Header as HeaderSimple,
  Header as HeaderLarge,
  LogoOnly,
  NoOutboundLinksHeader,
  Drawer,
  THeaderOptions
} from '@financial-times/dotcom-ui-header/component'
import { TNavigationData } from '@financial-times/dotcom-types-navigation'
import { Footer, LegalFooter, TFooterOptions } from '@financial-times/dotcom-ui-footer/component'
import Template from './Template'

enum Headers {
  simple = HeaderSimple,
  'large-logo' = HeaderLarge,
  'logo-only' = LogoOnly,
  'no-outbound-links' = NoOutboundLinksHeader
}

enum Footers {
  simple = Footer,
  legal = LegalFooter
}

export type TLayoutProps = {
  navigationData?: TNavigationData
  headerOptions?: THeaderOptions
  headerBefore?: string | React.ReactNode
  headerVariant?: Headers | false
  headerComponent?: React.ReactNode
  headerAfter?: string | React.ReactNode
  footerOptions?: TFooterOptions
  footerBefore?: string | React.ReactNode
  footerVariant?: Footers | false
  footerComponent?: React.ReactNode
  footerAfter?: string | React.ReactNode
  children?: React.ReactNode
  contents?: string
  metadata?: {
    'pro-navigation': string | undefined 
  }
}

export function Layout({
  navigationData,
  headerOptions,
  headerBefore,
  headerVariant,
  headerComponent,
  headerAfter,
  footerOptions,
  footerBefore,
  footerVariant,
  footerComponent,
  footerAfter,
  children,
  contents,
  metadata
}: TLayoutProps) {
  let header = null
  let drawer = null

  if (headerVariant && Headers[headerVariant] && !headerComponent) {
    const Header = Headers[headerVariant]
    header = <Header {...headerOptions} data={navigationData} metadata={metadata} variant={headerVariant} />

    if (Header === HeaderSimple || Header === HeaderLarge) {
      drawer = <Drawer {...headerOptions} data={navigationData} />
    }
  }

  let footer = null

  if (footerVariant && Footers[footerVariant] && !footerComponent) {
    const Footer = Footers[footerVariant]
    footer = <Footer {...footerOptions} data={navigationData} variant={footerVariant} />
  }

  return (
    <div className="n-layout">
      <a
        data-trackable="a11y-skip-to-help"
        className="n-layout__skip-link"
        href="https://www.ft.com/accessibility"
      >
        Accessibility help
      </a>

      {drawer ? (
        <a data-trackable="a11y-skip-to-navigation" className="n-layout__skip-link" href="#site-navigation">
          Skip to navigation
        </a>
      ) : null}

      <a data-trackable="a11y-skip-to-content" className="n-layout__skip-link" href="#site-content">
        Skip to content
      </a>

      {footer ? (
        <a data-trackable="a11y-skip-to-footer" className="n-layout__skip-link" href="#site-footer">
          Skip to footer
        </a>
      ) : null}

      <div className="n-layout__row n-layout__row--header">
        <Template className="n-layout__header-before">{headerBefore}</Template>
        {headerComponent || header || null}
        <Template className="n-layout__header-after">{headerAfter}</Template>
      </div>
      <div className="n-layout__row n-layout__row--content">
        <Template>{contents || children}</Template>
      </div>
      <div className="n-layout__row n-layout__row--footer">
        <Template className="n-layout__footer-before">{footerBefore}</Template>
        {footerComponent || footer || null}
        <Template className="n-layout__footer-after">{footerAfter}</Template>
      </div>

      {drawer}
    </div>
  )
}

Layout.defaultProps = {
  headerVariant: 'simple',
  footerVariant: 'simple',
  headerOptions: {},
  footerOptions: {}
}
