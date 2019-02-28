import React from 'react'
import * as utils from './utils'

export const DrawerParentItem = ({ label, url, submenu, index, equalsCurrentUrl }) => {
  return (
    <React.Fragment>
      <div key={url} className="o-header__drawer-menu-toggle-wrapper">
        <a
          className={utils.menuLinkClasses(equalsCurrentUrl(url), 'parent')}
          href={url}
          {...utils.ariaCurrent(equalsCurrentUrl(url))}
          data-trackable={label}>
          {label}
        </a>
        <button
          className={utils.menuToggleClasses(equalsCurrentUrl(url))}
          aria-controls={`o-header-drawer-child-${index}`}
          data-trackable={`sub-level-toggle | ${label}`}>
          {`Show more ${label} links`}
        </button>
      </div>
      <ul
        className="o-header__drawer-menu-list o-header__drawer-menu-list--child"
        id={`o-header-drawer-child-${index}`}
        data-trackable="sub-level">
        {submenu.items.map((item) => {
          return (
            <li key={item.url} className="o-header__drawer-menu-item">
              <a
                className={utils.menuLinkClasses(equalsCurrentUrl(url), 'child')}
                href={item.url}
                {...utils.ariaCurrent(equalsCurrentUrl(url))}
                data-trackable={item.label}>
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </React.Fragment>
  )
}

export const DrawerSingleItem = ({ label, url, equalsCurrentUrl }) => {
  return (
    <a className={utils.menuLinkClasses(equalsCurrentUrl(url))} href={url} data-trackable={label}>
      {label}
    </a>
  )
}

export const DrawerSpecialItem = ({ label, url, equalsCurrentUrl }) => {
  return (
    <a
      className={utils.menuLinkClasses(equalsCurrentUrl(url), 'secondary')}
      href={url}
      {...utils.ariaCurrent(equalsCurrentUrl(url))}
      data-trackable={label}>
      {label}
    </a>
  )
}

export const EditionsSwitcher = ({ otherEditions }) => (
  <ul className="o-header__drawer-menu-list">
    {otherEditions.map(({ id, name, url }) => {
      const href = `${url}?edition=${id}`
      return (
        <li key={id} className="o-header__drawer-menu-item" data-trackable="edition-switcher">
          <a className="o-header__drawer-menu-link" href={href} data-trackable={id}>
            Switch to {name}
          </a>
        </li>
      )
    })}
  </ul>
)
