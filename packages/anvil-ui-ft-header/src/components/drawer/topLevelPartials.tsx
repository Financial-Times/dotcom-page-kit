import React from 'react'
import { DrawerParentItem, DrawerSingleItem, DrawerSpecialItem, EditionsSwitcher } from './additionalPartials'
import { THeaderProps, TEditions, TUserMenu, TItem } from '../../interfaces'

const IncludeDrawer = (props) => <Drawer {...props} />

const Drawer = (props: THeaderProps) => {
  // TODO refactor editions and sections data from improved navigation model
  const editions = props.data.editions
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
        <DrawerTools {...editions} />
        <Search />

        <nav className="o-header__drawer-menu o-header__drawer-menu--primary o-header__drawer-menu--border">
          {editions && <EditionsSwitcher {...editions} />}
          <ul className="o-header__drawer-menu-list">
            <SectionPrimary {...sections[0]} />
            <SectionSecondary {...sections[1]} />
            <SectionTertiary {...sections[2]} />
          </ul>
        </nav>

        <UserMenu {...userMenu} />
      </div>
    </div>
  )
}

const DrawerTools = (editions: TEditions) => {
  return (
    <div className="o-header__drawer-tools">
      <button
        type="button"
        className="o-header__drawer-tools-close"
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
      <form
        className="o-header__drawer-search-form"
        action="/search"
        role="search"
        aria-label="Site search"
        data-n-topic-search
        data-n-topic-search-categories="concepts,equities"
        data-n-topic-search-view-all>
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
          data-trackable="search-term"
          data-n-topic-search-input
        />
        <button className="o-header__drawer-search-submit" type="submit" data-trackable="search-submit">
          <span className="o-header__visually-hidden">Search</span>
        </button>
      </form>
    </div>
  )
}

const SectionPrimary = ({ label, submenu }: TItem) => {
  return (
    <React.Fragment>
      <li className="o-header__drawer-menu-item o-header__drawer-menu-item--heading">{label}</li>
      {submenu.items.map((item, index) => {
        return (
          <li key={item.url} className="o-header__drawer-menu-item">
            {item.submenu ? <DrawerParentItem props={item} index={index} /> : <DrawerSingleItem {...item} />}
          </li>
        )
      })}
    </React.Fragment>
  )
}

const SectionSecondary = ({ label, submenu }: TItem) => {
  return (
    <React.Fragment>
      <li className="o-header__drawer-menu-item o-header__drawer-menu-item--heading">{label}</li>
      {submenu.items.map((item) => {
        return (
          <li key={item.url} className="o-header__drawer-menu-item">
            <DrawerSingleItem {...item} />
          </li>
        )
      })}
    </React.Fragment>
  )
}

const SectionTertiary = ({ submenu }: TItem) => {
  return (
    <React.Fragment>
      {submenu.items.map((item, index) => {
        const divideItem = index === 0 ? 'o-header__drawer-menu-item--divide' : ''
        return (
          <li key={item.url} className={`o-header__drawer-menu-item ${divideItem}`}>
            <DrawerSpecialItem {...item} />
          </li>
        )
      })}
    </React.Fragment>
  )
}

const UserMenu = (userMenu: TUserMenu) => {
  return (
    <nav className="o-header__drawer-menu o-header__drawer-menu--user" data-trackable="user-nav">
      <ul className="o-header__drawer-menu-list">
        {userMenu.items.map((item) => {
          return (
            <li key={item.url} className="o-header__drawer-menu-item">
              <a className="o-header__drawer-menu-link" href={item.url} data-trackable={item.label}>
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export { IncludeDrawer }
