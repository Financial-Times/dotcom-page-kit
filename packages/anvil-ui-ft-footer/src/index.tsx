import React from 'react'
import { TFooterProps } from './interfaces'

import {
  FooterRow,
  FooterContents,
  MoreFromFt,
  CopyrightNotice,
  NikkeiBrandLogo,
  CompressedLegal
} from './components/partials'

function Footer(props: TFooterProps) {
  const theme = props.theme ? `${props.theme}` : 'dark'
  return (
    <footer id="site-footer" className={`o-footer o-footer--theme-${theme}`} data-o-component="o-footer">
      <div className="o-footer__container">
        <FooterRow>
          <FooterContents footerData={props.data} />
        </FooterRow>
        <MoreFromFt />
        <CopyrightNotice />
      </div>
      <NikkeiBrandLogo />
    </footer>
  )
}

function LegalFooter(props: TFooterProps) {
  const theme = props.theme ? props.theme : 'dark'
  return (
    <footer id="site-footer" className={`o-footer o-footer--theme-${theme}`} data-o-component="o-footer">
      <div className="o-footer__container">
        <CompressedLegal footerData={props.data} />
        <CopyrightNotice withoutMarketsData={true} />
      </div>
      <NikkeiBrandLogo />
    </footer>
  )
}

export { Footer, LegalFooter, TFooterProps }
