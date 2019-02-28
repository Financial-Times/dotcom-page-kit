import React from 'react'

export const DrawerParentItem = ({ item, index }) => {
  const ariaSelected = item.selected ? `aria-label="Current page" aria-current="true"` : null
  const selected = item.selected ? 'selected' : 'unselected'
  return (
    <React.Fragment>
      <div key={item.url} className="o-header__drawer-menu-toggle-wrapper">
        <a
          className={`o-header__drawer-menu-link o-header__drawer-menu-link--${selected} o-header__drawer-menu-link--parent`}
          href={item.url}
          {...ariaSelected}
          data-trackable={item.label}>
          {item.label}
        </a>
        <button
          className={`o-header__drawer-menu-toggle o-header__drawer-menu-toggle--${selected}`}
          aria-controls={`o-header-drawer-child-${index}`}
          data-trackable={`sub-level-toggle | ${item.label}`}>
          {`Show more ${item.label} links`}
        </button>
      </div>
      <ul
        className="o-header__drawer-menu-list o-header__drawer-menu-list--child"
        id={`o-header-drawer-child-${index}`}
        data-trackable="sub-level">
        {item.submenu.items.map((item) => {
          const ariaSelected = item.selected ? `aria-label="Current page" aria-current="true"` : null
          return (
            <li key={item.url} className="o-header__drawer-menu-item">
              <a
                className={`o-header__drawer-menu-link o-header__drawer-menu-link--${selected} o-header__drawer-menu-link--child`}
                href={item.url}
                {...ariaSelected}
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

export const DrawerSingleItem = (item) => {
  const selected = item.selected ? 'selected' : 'unselected'
  return (
    <a
      className={`o-header__drawer-menu-link o-header__drawer-menu-link--${selected}`}
      href={item.url}
      data-trackable={item.label}>
      {item.label}
    </a>
  )
}

export const DrawerSpecialItem = ({ item }) => {
  const selected = item.selected ? 'selected' : 'unselected'
  const ariaSelected = item.selected ? `aria-label="Current page" aria-current="true"` : null
  return (
    <a
      className={`o-header__drawer-menu-link o-header__drawer-menu-link--${selected} o-header__drawer-menu-link--secondary`}
      href={item.url}
      {...ariaSelected}
      data-trackable={item.label}>
      {item.label}
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
