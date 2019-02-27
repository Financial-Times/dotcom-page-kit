import React from 'react'
import { DrawerParentItem, DrawerSingleItem } from './additionalPartials'
import { isCurrentUrl } from './utils'
const IncludeDrawer = (props) => <Drawer {...props} />

const Drawer = (props) => {
  /* Note: isSelected is a function that is passed as a prop though the stack */
  /* It stores the currentUrl and can be called with any url string  */
  /* Returns true if the value passed in matches the currentUrl it was initialised with */
  const isSelected = isCurrentUrl(props.options.currentUrl)
  const sections = props.data.drawer.items
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
      <div className="o-header__drawer-inner">
        <ul className="o-header__drawer-menu-list">
          <SectionPrimary {...sections[0]} isSelected={isSelected} />
        </ul>
      </div>
    </div>
  )
}

const SectionPrimary = ({ label, submenu, isSelected }) => {
  return (
    <React.Fragment>
      <li className="o-header__drawer-menu-item o-header__drawer-menu-item--heading">{label}</li>
      {submenu.items.map((item, index) => {
        return (
          <li key={item.url} className="o-header__drawer-menu-item">
            {item.submenu ? (
              <DrawerParentItem {...item} index={index} isSelected={isSelected} />
            ) : (
              <DrawerSingleItem {...item} isSelected={isSelected} />
            )}
          </li>
        )
      })}
    </React.Fragment>
  )
}

export { IncludeDrawer }
