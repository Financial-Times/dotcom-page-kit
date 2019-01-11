import React from 'react'
import { Props } from './interfaces'

const MatrixTitle = ({ label, submenu, index }) => {
  // On smaller viewports, submenus which span two columns are collapsed behind toggles
  const ariaControls = { 'aria-controls': submenu.length === 2 ? `o-footer-section-${index}` : null }
  return (
    <div className="o-footer__matrix-title" {...ariaControls}>
      {label}
    </div>
  )
}

const MatrixContent = ({ submenu, index }) => {
  return (
    <div className="o-footer__matrix-content" id={`o-footer-section-${index}`}>
      <div className="o-footer__matrix-column">
        {submenu[0].map((item) => {
          const disableTracking = { 'data-o-tracking-do-not-track': item.disableTracking ? 'true' : null }
          return (
            <a
              className="o-footer__matrix-link"
              href={`${item.url}`}
              data-trackable={`${item.label}`}
              {...disableTracking}>
              {item.label}
            </a>
          )
        })}
      </div>
    </div>
  )
}

const MenuSection = ({ label, submenu, index }) => {
  return (
    <div className="o-footer__matrix-group o-footer__matrix-group--{{submenu.items.length}}">
      <MatrixTitle label={label} submenu={submenu} index={index} />
      <MatrixContent submenu={submenu} index={index} />
    </div>
  )
}

const MenuItems = ({ items }) => {
  return items.map((item, index) => (
    <MenuSection label={item.label} submenu={item.submenu.items} index={index} />
  ))
}

const MoreFromFt = () => (
  <div className="o-footer__external-link o-footer__matrix-title">
    <a
      className="o-footer__more-from-ft o-footer__matrix-title"
      href="http://ft.com/more-from-ft-group"
      data-trackable="more-from-ft">
      More from the FT Group
    </a>
  </div>
)

const Copyright = () => (
  <div className="o-footer__copyright" role="contentinfo">
    <small>
      Markets data delayed by at least 15 minutes. &#xA9; The Financial Times LTD.
      <abbr title="Financial Times" aria-label="F T">
        FT
      </abbr>{' '}
      and &#x2018; Financial Times&#x2019; are trademarks of The Financial Times Ltd.
      <br />
      The Financial Times and its journalism are subject to a self-regulation regime under the{' '}
      <a href="http://aboutus.ft.com/en-gb/ft-editorial-code/" aria-label="F T Editorial Code of Practice">
        FT Editorial Code of Practice
      </a>
      .
    </small>
  </div>
)

const BrandLogo = () => (
  <div className="o-footer__brand">
    <div className="o-footer__container">
      <div className="o-footer__brand-logo" />
    </div>
  </div>
)

const MenuRow = (props) => (
  <div className="o-footer__row">
    <nav className="o-footer__matrix" role="navigation" aria-label="Useful links">
      {props.children}
    </nav>
  </div>
)

export default function FtFooter(props: Props) {
  const theme = props.themeLight ? 'theme-light' : 'theme-dark'
  return (
    <footer id="site-footer" className={`o-footer o-footer--${theme}`} data-o-component="o-footer">
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
