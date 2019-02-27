import React from 'react'
import * as utils from './utils'

export const DrawerParentItem = ({ label, url, submenu, index, isSelected }) => {
  // TODO add aria
  // TODO adds types to classes dynamically
  return (
    <React.Fragment>
      <div key={url} className="o-header__drawer-menu-toggle-wrapper">
        <a className={utils.menuLinkClasses(isSelected(url), 'parent')} href={url} data-trackable={label}>
          {label}
        </a>
        <button
          className={utils.menuToggleClasses(isSelected(url))}
          aria-controls={`o-header-drawer-child-${index}`}
          data-trackable={`sub-level-toggle | ${label}`}>
          {`Show more ${label} links`}
        </button>
      </div>
      <ul
        className="o-header__drawer-menu-list o-header__drawer-menu-list--child"
        id={'o-header-drawer-child-' + index}
        data-trackable="sub-level">
        {submenu.items.map((item) => {
          return (
            <li key={item.url} className="o-header__drawer-menu-item">
              <a
                className={utils.menuLinkClasses(isSelected(url), 'child')}
                href={item.url}
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

export const DrawerSingleItem = ({ label, url, isSelected }) => {
  return (
    <a className={utils.menuLinkClasses(isSelected(url))} href={url} data-trackable={label}>
      {label}
    </a>
  )
}
