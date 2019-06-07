import React from 'react'
import { ariaSelected } from '../../utils'
import { TNavMenuItem, TNavEditions } from '@financial-times/anvil-types-navigation'

export type TDrawerParentItemProps = {
  item: TNavMenuItem
  index: number
}

export const DrawerParentItem = ({ item, index }: TDrawerParentItemProps) => {
  const selected = item.selected ? 'selected' : 'unselected'
  return (
    <React.Fragment>
      <div key={item.url} className="o-header__drawer-menu-toggle-wrapper">
        <a
          className={`o-header__drawer-menu-link o-header__drawer-menu-link--${selected} o-header__drawer-menu-link--parent`}
          href={item.url}
          {...ariaSelected(item)}
          data-trackable={item.label}>
          {item.label}
        </a>
        <button
          className={`o-header__drawer-menu-toggle o-header__drawer-menu-toggle--${selected}`}
          aria-controls={`o-header-drawer-child-${index}`}
          data-trackable={`sub-level-toggle | ${item.label}`}>
          {`Show more ${item.label}`}
        </button>
      </div>
      <ul
        className="o-header__drawer-menu-list o-header__drawer-menu-list--child"
        id={`o-header-drawer-child-${index}`}
        data-trackable="sub-level">
        {(item.submenu.items as TNavMenuItem[]).map((item) => {
          const selected = item.selected ? 'selected' : 'unselected'
          return (
            <li key={item.url} className="o-header__drawer-menu-item">
              <a
                className={`o-header__drawer-menu-link o-header__drawer-menu-link--${selected} o-header__drawer-menu-link--child`}
                href={item.url}
                data-trackable={item.label}
                {...ariaSelected(item)}>
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </React.Fragment>
  )
}

export const DrawerSingleItem = (item: TNavMenuItem) => {
  const selected = item.selected ? 'selected' : 'unselected'
  return (
    <a
      className={`o-header__drawer-menu-link o-header__drawer-menu-link--${selected}`}
      href={item.url}
      data-trackable={item.label}
      {...ariaSelected(item)}>
      {item.label}
    </a>
  )
}

export const DrawerSpecialItem = (item: TNavMenuItem) => {
  const selected = item.selected ? 'selected' : 'unselected'
  return (
    <a
      className={`o-header__drawer-menu-link o-header__drawer-menu-link--${selected} o-header__drawer-menu-link--secondary`}
      href={item.url}
      data-trackable={item.label}
      {...ariaSelected(item)}>
      {item.label}
    </a>
  )
}

export const EditionsSwitcher = (editions: TNavEditions) => (
  <ul className="o-header__drawer-menu-list">
    {editions.others.map(({ id, name, url }) => {
      const href = `${url}?edition=${id}`
      return (
        <li key={id} className="o-header__drawer-menu-item" data-trackable="edition-switcher">
          <a className="o-header__drawer-menu-link" href={href} data-trackable={id}>
            Switch to {name} Edition
          </a>
        </li>
      )
    })}
  </ul>
)
