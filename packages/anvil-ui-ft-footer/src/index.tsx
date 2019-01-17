import React from 'react'
import { Props } from './interfaces'
import {
  FooterRow,
  FooterContents,
  MoreFromFt,
  CopyrightNotice,
  NikkeiBrandLogo,
  CompressedLegal
} from './components/partials'

export function Footer(props: Props) {
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

export function LegalFooter(props: Props) {
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
