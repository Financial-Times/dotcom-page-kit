import React from 'react'
import { TNavMenuItem } from '@financial-times/anvil-types-navigation'
import {
  FooterContents,
  MoreFromFT,
  CopyrightNotice,
  NikkeiBrandLogo,
  CompressedLegal
} from './components/partials'

export interface TFooterProps {
  data: TNavMenuItem[]
  theme?: 'dark' | 'light' | string
}

export function Footer(props: TFooterProps) {
  const theme = props.theme ? `${props.theme}` : 'dark'
  return (
    <footer id="site-footer" className={`o-footer o-footer--theme-${theme}`} data-o-component="o-footer">
      <div className="o-footer__container">
        <FooterContents footerData={props.data} />
        <MoreFromFT />
        <CopyrightNotice />
      </div>
      <NikkeiBrandLogo />
    </footer>
  )
}

export function LegalFooter(props: TFooterProps) {
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
