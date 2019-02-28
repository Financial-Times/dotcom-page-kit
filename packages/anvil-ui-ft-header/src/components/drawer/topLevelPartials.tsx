import React from 'react'
import { DrawerParentItem, DrawerSingleItem, DrawerSpecialItem, EditionsSwitcher } from './additionalPartials'
const IncludeDrawer = (props) => <Drawer {...props} />

// TODO add custom ft-header styles
// TODO refactor section data by edition

const Drawer = (props) => {
  const equalsCurrentUrl = (url) => props.options.currentUrl === url
  // TODO refactor editions data from improved navigation model
  const editions = props.data.editionsUk
  const sections = props.data.drawer.items
  const userMenu = props.data.user
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
        <DrawerTools editions={editions} />
        <Search />

        <nav className="o-header__drawer-menu o-header__drawer-menu--primary o-header__drawer-homepage">
          {editions && <EditionsSwitcher otherEditions={editions.others} />}
          <ul className="o-header__drawer-menu-list">
            <SectionPrimary {...sections[0]} equalsCurrentUrl={equalsCurrentUrl} />
            <SectionSecondary {...sections[1]} equalsCurrentUrl={equalsCurrentUrl} />
            <SectionTertiary {...sections[2]} equalsCurrentUrl={equalsCurrentUrl} />
          </ul>
        </nav>

        <UserMenu {...userMenu} />
      </div>
    </div>
  )
}

const DrawerTools = ({ editions }) => {
  return (
    <div className="o-header__drawer-tools">
      <button
        className="o-header__drawer-tools-close"
        type="button"
        title="Close drawer menu"
        aria-controls="o-header-drawer"
        data-trackable="close">
        <span className="o-header__visually-hidden">Close</span>
      </button>

      <a className="o-header__drawer-tools-logo" href="/" data-trackable="logo">
        <span className="o-header__visually-hidden">Financial Times</span>
      </a>

      {editions && <p className="o-header__drawer-current-edition">{editions.current.name}</p>}
    </div>
  )
}

const Search = () => {
  return (
    <div className="o-header__drawer-search">
      <form className="o-header__drawer-search-form" action="/search" role="search" aria-label="Site search">
        <label className="o-header__visually-hidden" htmlFor="o-header-drawer-search-term">
          Search the <abbr title="Financial Times">FT</abbr>
        </label>
        <input
          className="o-header__drawer-search-term"
          id="o-header-drawer-search-term"
          name="q"
          type="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="Search the FT"
        />
        <button className="o-header__drawer-search-submit" type="submit">
          <span className="o-header__visually-hidden">Search</span>
        </button>
      </form>
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

const UserMenu = ({ items }) => {
  return (
    <nav className="o-header__drawer-menu o-header__drawer-menu--user" data-trackable="user-nav">
      <ul className="o-header__drawer-menu-list">
        {items.map(({ label, url }) => {
          return (
            <li key={url} className="o-header__drawer-menu-item">
              <a className="o-header__drawer-menu-link" href={url} data-trackable={label}>
                {label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export { IncludeDrawer }
