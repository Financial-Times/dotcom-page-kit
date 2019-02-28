import React from 'react'
import { DrawerParentItem, DrawerSingleItem, DrawerSpecialItem } from './additionalPartials'
const IncludeDrawer = (props) => <Drawer {...props} />

const Drawer = (props) => {
  const equalsCurrentUrl = (url) => props.options.currentUrl === url
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
          <SectionPrimary {...sections[0]} equalsCurrentUrl={equalsCurrentUrl} />
          <SectionSecondary {...sections[1]} equalsCurrentUrl={equalsCurrentUrl} />
          <SectionTertiary {...sections[2]} equalsCurrentUrl={equalsCurrentUrl} />
        </ul>
      </div>
    </div>
  )
}

const SectionPrimary = ({ label, submenu, equalsCurrentUrl }) => {
  return (
    <React.Fragment>
      <li className="o-header__drawer-menu-item o-header__drawer-menu-item--heading">{label}</li>
      {submenu.items.map((item, index) => {
        return (
          <li key={item.url} className="o-header__drawer-menu-item">
            {item.submenu ? (
              <DrawerParentItem {...item} index={index} equalsCurrentUrl={equalsCurrentUrl} />
            ) : (
              <DrawerSingleItem {...item} equalsCurrentUrl={equalsCurrentUrl} />
            )}
          </li>
        )
      })}
    </React.Fragment>
  )
}

const SectionSecondary = ({ label, submenu, equalsCurrentUrl }) => {
  return (
    <React.Fragment>
      <li className="o-header__drawer-menu-item o-header__drawer-menu-item--heading">{label}</li>
      {submenu.items.map((item) => {
        return (
          <li key={item.url} className="o-header__drawer-menu-item">
            <DrawerSingleItem {...item} equalsCurrentUrl={equalsCurrentUrl} />
          </li>
        )
      })}
    </React.Fragment>
  )
}

const SectionTertiary = ({ submenu, equalsCurrentUrl }) => {
  return (
    <React.Fragment>
      {submenu.items.map((item, index) => {
        const conditionalClass = index === 0 ? 'o-header__drawer-menu-item--divide' : null
        return (
          <li key={item.url} className={`o-header__drawer-menu-item, ${conditionalClass}`}>
            <DrawerSpecialItem {...item} equalsCurrentUrl={equalsCurrentUrl} />
          </li>
        )
      })}
    </React.Fragment>
  )
}

export { IncludeDrawer }
