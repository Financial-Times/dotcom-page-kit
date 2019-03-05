import React from 'react'
import { IDrawerParent, TItem, TEditions } from '../../interfaces'

const ariaSelected = (item) => {
  return item.selected ? { 'aria-label': 'Current page', 'aria-current': 'true', test: 'true' } : null
}

export const DrawerParentItem = ({ props, index }: IDrawerParent) => {
  const selected = props.selected ? 'selected' : 'unselected'
  return (
    <React.Fragment>
      <div key={props.url} className="o-header__drawer-menu-toggle-wrapper">
        <a
          className={`o-header__drawer-menu-link o-header__drawer-menu-link--${selected} o-header__drawer-menu-link--parent`}
          href={props.url}
          {...ariaSelected(props)}
          data-trackable={props.label}>
          {props.label}
        </a>
        <button
          className={`o-header__drawer-menu-toggle o-header__drawer-menu-toggle--${selected}`}
          aria-controls={`o-header-drawer-child-${index}`}
          data-trackable={`sub-level-toggle | ${props.label}`}>
          {`Show more ${props.label} links`}
        </button>
      </div>
      <ul
        className="o-header__drawer-menu-list o-header__drawer-menu-list--child"
        id={`o-header-drawer-child-${index}`}
        data-trackable="sub-level">
        {props.submenu.items.map((item) => {
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

export const DrawerSingleItem = (item: TItem) => {
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

export const DrawerSpecialItem = (item: TItem) => {
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

export const EditionsSwitcher = (editions: TEditions) => (
  <ul className="o-header__drawer-menu-list">
    {editions.others.map(({ id, name, url }) => {
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
