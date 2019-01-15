import React from 'react'

const Link: Function = ({ item }) => {
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
}

const SectionLinks = ({ submenu, index }) => {
  return (
    <div className="o-footer__matrix-content" id={`o-footer-section-${index}`}>
      {submenu.map((submenuItems, columnIndex) => (
        <div className="o-footer__matrix-column" key={`footer-section-${index}--column-${columnIndex}`}>
          {submenuItems.map((item, itemIndex) => {
            return <Link item={item} index={itemIndex} key={`footer-section-${index}--link-${itemIndex}`} />
          })}
        </div>
      ))}
    </div>
  )
}

const SectionTitle = ({ label, submenu, index }) => {
  // On smaller viewports, submenus which span two columns are collapsed behind toggles
  const ariaControls = { 'aria-controls': submenu.length === 2 ? `o-footer-section-${index}` : null }
  return (
    <div className="o-footer__matrix-title" {...ariaControls}>
      {label}
    </div>
  )
}

const MenuSection: Function = ({ label, submenu, index }) => {
  return (
    <div className={`o-footer__matrix-group o-footer__matrix-group--${submenu.length}`}>
      <SectionTitle label={label} submenu={submenu} index={index} />
      <SectionLinks submenu={submenu} index={index} />
    </div>
  )
}

const FooterRow = (props) => (
  <div className="o-footer__row">
    <nav className="o-footer__matrix" role="navigation" aria-label="Useful links">
      {props.children}
    </nav>
  </div>
)

const FooterContents = ({ footerData }) => {
  return footerData.map((item, index) => (
    <MenuSection
      label={item.label}
      submenu={item.submenu.items}
      index={index}
      key={`footer-section-${index}`}
    />
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

const CopyrightNotice: Function = ({ withoutMarketsData }) => {
  const marketsData = withoutMarketsData ? null : 'Markets data delayed by at least 15 minutes.'
  return (
    <div className="o-footer__copyright" role="contentinfo">
      <small>
        {marketsData} © The Financial Times LTD.
        <abbr title="Financial Times" aria-label="F T">
          FT
        </abbr>{' '}
        and ‘Financial Times’ are trademarks of The Financial Times Ltd.
        <br />
        The Financial Times and its journalism are subject to a self-regulation regime under the{' '}
        <a href="http://aboutus.ft.com/en-gb/ft-editorial-code/" aria-label="F T Editorial Code of Practice">
          FT Editorial Code of Practice
        </a>
        .
      </small>
    </div>
  )
}

const LegalLink: Function = ({ item, index }) => {
  const disableTracking = { 'data-o-tracking-do-not-track': item.disableTracking ? 'true' : null }
  return (
    <li key={`legalFooter-link-${index}`}>
      <a href={`${item.url}`} data-trackable={`${item.label}`} {...disableTracking}>
        {item.label}
      </a>
    </li>
  )
}

const CompressedLegal = ({ footerData }) => {
  const LegalAndPrivacy = footerData.filter((item) => {
    return item.label === 'Legal & Privacy'
  })
  return LegalAndPrivacy.map((legal, sectionIndex) => (
    <div key={`legalFooter-${sectionIndex}`}>
      {legal.submenu && legal.submenu.items
        ? legal.submenu.items.map((items, submenuIndex) => (
            <ul className="o-footer__legal-links" key={`legalFooter-submenu-${submenuIndex}`}>
              {items.map((item, submenuIndex) => {
                return <LegalLink item={item} key={`legalFooter-link-${submenuIndex}`} />
              })}
            </ul>
          ))
        : null}
    </div>
  ))
}

const NikkeiBrandLogo = () => (
  <div className="o-footer__brand">
    <div className="o-footer__container">
      <div className="o-footer__brand-logo" />
    </div>
  </div>
)

export {
  SectionLinks,
  SectionTitle,
  MenuSection,
  FooterRow,
  FooterContents,
  MoreFromFt,
  CompressedLegal,
  CopyrightNotice,
  NikkeiBrandLogo
}
