import React from 'react'
import { TNavigationData } from '@financial-times/anvil-types-navigation'
import {
  FooterContents,
  MoreFromFT,
  CopyrightNotice,
  NikkeiBrandLogo,
  CompressedLegal
} from './components/partials'

export type TFooterProps = {
  data: TNavigationData
  theme?: 'dark' | 'light' | string
}

export function Footer(props: TFooterProps) {
  const footerData = props.data.footer.items
  const theme = props.theme ? `${props.theme}` : 'dark'
  return (
    <footer id="site-footer" className={`o-footer o-footer--theme-${theme}`} data-o-component="o-footer">
      <div className="o-footer__container">
        <FooterContents footerData={footerData} />
        <MoreFromFT />
        <CopyrightNotice />
      </div>
      <NikkeiBrandLogo />
    </footer>
  )
}

export function LegalFooter(props: TFooterProps) {
  const footerData = props.data.footer.items
  const theme = props.theme ? props.theme : 'dark'
  return (
    <footer id="site-footer" className={`o-footer o-footer--theme-${theme}`} data-o-component="o-footer">
      <div className="o-footer__container">
        <CompressedLegal footerData={footerData} />
        <CopyrightNotice withoutMarketsData={true} />
      </div>
      <NikkeiBrandLogo />
    </footer>
  )
}
