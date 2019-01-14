import React from 'react'
import { Props } from './interfaces'
import { LegalOnly, MenuItems, MenuRow, MoreFromFt, Copyright, BrandLogo } from './components/partials'

export function Footer(props: Props) {
  const theme = props.theme ? `${props.theme}` : 'dark'
  return (
    <footer id="site-footer" className={`o-footer o-footer--theme-${theme}`} data-o-component="o-footer">
      <div className="o-footer__container">
        <MenuRow>
          <MenuItems items={props.data} />
        </MenuRow>
        <MoreFromFt />
        <Copyright />
      </div>
      <BrandLogo /> {/* Nikkei banner */}
    </footer>
  )
}

export function LegalFooter(props: Props) {
  const theme = props.theme ? `${props.theme}` : 'dark'
  return (
    <footer id="site-footer" className={`o-footer o-footer--theme-${theme}`} data-o-component="o-footer">
      <div className="o-footer__container">
        <LegalOnly items={props.data} />
        <Copyright />
      </div>
      <BrandLogo /> {/* Nikkei banner */}
    </footer>
  )
}
