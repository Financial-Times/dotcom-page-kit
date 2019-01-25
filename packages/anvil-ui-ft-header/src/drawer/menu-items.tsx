import React from 'react'

import { IDrawerParentProps, IDrawerItemProps } from '../../typings/anvil-ui-ft-header'
import * as utils from './utils'

export const Root: React.FC = ({ children }) => {
  return (
    <div
      className="o-header__drawer"
      id="o-header-drawer"
      role="navigation"
      aria-label="Drawer menu"
      data-o-header-drawer
      data-o-header-drawer--no-js
      data-trackable="drawer"
      data-trackable-terminate>
      <div className="o-header__drawer-inner">{children}</div>
    </div>
  )
}

export const MenuList: React.FC = ({ children }) => {
  return <ul className="o-header__drawer-menu-list">{children}</ul>
}

export const SectionHead: React.FC = ({ children }) => {
  return <li className="o-header__drawer-menu-item o-header__drawer-menu-item--heading">{children}</li>
}

export const DrawerParentItem: React.FC<IDrawerParentProps> = ({
  label,
  url,
  submenu,
  index,
  isSelected
}) => {
  return (
    <React.Fragment>
      <div key={url} className="o-header__drawer-menu-toggle-wrapper">
        <a
          className={utils.menuLinkClass(isSelected(url), 'parent')}
          href={url}
          {...utils.aria(isSelected(url))}
          data-trackable={label}>
          {label}
        </a>
        <button
          className={utils.menuToggleClass(isSelected(url))}
          aria-controls={'o-header-drawer-child-' + index}
          data-trackable={'sub-level-toggle | ' + label}>
          Show more {label} links
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
                className={utils.menuLinkClass(isSelected(url), 'child')}
                href={item.url}
                {...utils.aria(isSelected(item.url))}
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

export const DrawerSingleItem: React.FC<IDrawerItemProps> = ({ label, url, isSelected }) => {
  return (
    <a
      className={utils.menuLinkClass(isSelected(url))}
      href={url}
      {...utils.aria(isSelected(url))}
      data-trackable={label}>
      {label}
    </a>
  )
}

export const DrawerSpecialItem: React.FC<IDrawerItemProps> = ({ label, url, isSelected }) => {
  return (
    <a
      className={utils.menuLinkClass(isSelected(url), 'secondary')}
      href={url}
      {...utils.aria(isSelected(url))}
      data-trackable={label}>
      {label}
    </a>
  )
}
