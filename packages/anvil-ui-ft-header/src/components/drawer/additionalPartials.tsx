import React from 'react'

export const DrawerParentItem = ({ label, url, submenu, index, isSelected }) => {
  const selectedModifier = (isSelected: boolean) => (isSelected ? 'selected' : 'unselected')
  // TODO add aria
  // TODO adds types to classes dynamically
  return (
    <React.Fragment>
      <div key={url} className="o-header__drawer-menu-toggle-wrapper">
        <a
          className={`
            o-header__drawer-menu-link
            o-header__drawer-menu-link--${selectedModifier(isSelected(url))}
            o-header__drawer-menu-link--parent
          `}
          href={url}
          data-trackable={label}>
          {label}
        </a>
        <button
          className={`
            o-header__drawer-menu-toggle
            o-header__drawer-menu-toggle--${selectedModifier(isSelected(url))}
          `}
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
                className={`
                  o-header__drawer-menu-link
                  o-header__drawer-menu-link--${selectedModifier(isSelected(url))}
                  o-header__drawer-menu-link--child
                `}
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
  const selectedModifier = (isSelected: boolean) => (isSelected ? 'selected' : 'unselected')
  return (
    <a
      className={`
    o-header__drawer-menu-link
    o-header__drawer-menu-link--${selectedModifier(isSelected(url))}
    `}
      href={url}
      data-trackable={label}>
      {label}
    </a>
  )
}
