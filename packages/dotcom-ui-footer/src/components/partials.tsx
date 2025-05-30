import React from 'react'
import { TNavMenuItem } from '@financial-times/dotcom-types-navigation'

type TLinkProps = {
  item: TNavMenuItem
  [key: string]: any
}

const Link = ({ item, ...props }: TLinkProps) => {
  const disableTracking = { 'data-o-tracking-do-not-track': item.disableTracking ? true : null }

  return (
    <a {...props} href={item.url} data-trackable={item.label} {...disableTracking}>
      <span className="o-footer__matrix-link__copy">{item.label}</span>
    </a>
  )
}

type TSectionLinksProps = {
  index: number
  submenu: TNavMenuItem[][]
}

const SectionLinks = ({ submenu, index }: TSectionLinksProps) => {
  return (
    <div className="o-footer__matrix-content" id={`o-footer-section-${index}`}>
      {submenu.map((submenuItems, index) => (
        <div className="o-footer__matrix-column" key={`column-${index}`}>
          {submenuItems.map((item, index) => (
            <Link className="o-footer__matrix-link" item={item} key={`link-${index}`} />
          ))}
        </div>
      ))}
    </div>
  )
}

type TSectionTitleProps = {
  index: number
  label: string
}

const SectionTitle = ({ label, index }: TSectionTitleProps) => {
  // On smaller viewports, submenu which span one column is collapsed behind toggles
  const ariaControls = { 'aria-controls': `o-footer-section-${index}` }
  return (
    <h3 className="o-footer__matrix-title" {...ariaControls}>
      {label}
    </h3>
  )
}

type TFooterContentsProps = {
  footerData: TNavMenuItem[]
}

const FooterContents = ({ footerData }: TFooterContentsProps) => (
  <div className="o-footer__row">
    <h2 className="o3-visually-hidden">Useful links</h2>
    <nav className="o-footer__matrix" role="navigation" aria-label="Useful links">
      {footerData.map((item, index) => {
        // The Next navigation API splits footer links data into "columns"
        // <https://github.com/Financial-Times/next-navigation-api/blob/HEAD/server/transforms/footer.js>
        const submenu = item.submenu.items as TNavMenuItem[][]
        return (
          <div
            key={`group-${index}`}
            className={`o-footer__matrix-group o-footer__matrix-group--${submenu.length}`}
          >
            <SectionTitle label={item.label} index={index} />
            <SectionLinks submenu={submenu} index={index} />
          </div>
        )
      })}
      <div className="o-footer__matrix-group o-footer__matrix-group--1">
        <h3 className="o-footer__matrix-title o-footer__matrix-title--link">
          <a
            className="o-footer__matrix-link o-footer__matrix-link--more"
            id={`o-footer-${footerData.length}`}
            href="https://ft.com/more-from-ft-group"
          >
            <span className="o-footer__matrix-link__copy">More from the FT Group</span>
          </a>
        </h3>
      </div>
    </nav>
  </div>
)

const CopyrightNotice = ({ withoutMarketsData = false }) => {
  const marketsData = withoutMarketsData ? '' : 'Markets data delayed by at least 15 minutes. '
  return (
    <div className="o-footer__copyright">
      <small>
        {`${marketsData}© THE FINANCIAL TIMES LTD ${new Date().getFullYear()}. `}
        <abbr title="Financial Times" aria-label="F T">
          FT
        </abbr>{' '}
        and ‘Financial Times’ are trademarks of The Financial Times Ltd.
        <br />
        The Financial Times and its journalism are subject to a self-regulation regime under the{' '}
        <a href="https://aboutus.ft.com/en-gb/ft-editorial-code/" aria-label="F T Editorial Code of Practice">
          FT Editorial Code of Practice
        </a>
        .
      </small>
    </div>
  )
}

type TCompressedLegalProps = {
  footerData: TNavMenuItem[]
}

const CompressedLegal = ({ footerData }: TCompressedLegalProps) => {
  // Find the legal and privacy column
  const data = footerData.filter((item) => item.label === 'Legal & Privacy')

  return (
    <React.Fragment>
      {data.map((legal, index) => (
        // The Next navigation API splits footer links data into "columns"
        // <https://github.com/Financial-Times/next-navigation-api/blob/HEAD/server/transforms/footer.js>
        <div key={`column-${index}`}>
          {(legal.submenu.items as TNavMenuItem[][]).map((items, index) => (
            <ul className="o-footer__legal-links" key={`list-${index}`}>
              {items.map((item, index) => (
                <li key={`item-${index}`}>
                  <Link item={item} key={`link-${index}`} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      ))}
    </React.Fragment>
  )
}

const NikkeiBrandLogo = () => (
  <div className="o-footer__brand">
    <div className="o-footer__container">
      <div className="o-footer__brand-logo" />
    </div>
  </div>
)

export { SectionLinks, SectionTitle, FooterContents, CompressedLegal, CopyrightNotice, NikkeiBrandLogo }
