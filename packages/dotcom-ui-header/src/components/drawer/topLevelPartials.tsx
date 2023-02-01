import React from 'react'
import {
  DrawerParentItem,
  DrawerSingleItem,
  DrawerSpecialItem,
  EditionsSwitcher,
  SubscribeButton
} from './additionalPartials'
import { THeaderProps } from '../../interfaces'
import { TNavMenuItem, TNavMenu, TNavEditions } from '@financial-times/dotcom-types-navigation'

const IncludeDrawer = (props) => <Drawer {...props} />

const Drawer = (props: THeaderProps) => {
  const editions = props.data.editions
  const subscribeAction = props.data.subscribeAction
  const [primary, secondary, tertiary] = props.data.drawer.items
  const user = props.userIsLoggedIn ? props.data.user : props.data.anon

  return (
    <div
      className="o-header__drawer"
      id="o-header-drawer"
      role="modal"
      aria-label="Drawer menu"
      aria-modal="true"
      data-o-header-drawer
      data-o-header-drawer--no-js
      data-trackable="drawer"
      data-trackable-terminate
    >
      <div className="o-header__drawer-inner">
        <DrawerTools {...editions} />
        {!props.userIsSubscribed && subscribeAction && <SubscribeButton {...subscribeAction} />}
        <Search />
        <nav className="o-header__drawer-menu" aria-label="Edition switcher">
          {editions && <EditionsSwitcher {...editions} />}
        </nav>
        <nav className="o-header__drawer-menu o-header__drawer-menu--primary">
          {primary ? <SectionPrimary {...primary} /> : null}
          {secondary ? <SectionSecondary {...secondary} /> : null}
          {tertiary ? <SectionTertiary {...tertiary} /> : null}
        </nav>
        <UserMenu {...user} />
      </div>
    </div>
  )
}

const DrawerTools = (props: TNavEditions) => (
  <div className="o-header__drawer-tools">
    <button
      type="button"
      className="o-header__drawer-tools-close"
      title="Close side navigation menu"
      aria-controls="o-header-drawer"
      data-trackable="close"
    >
      <span className="o-header__visually-hidden">Close side navigation menu</span>
    </button>
    <a className="o-header__drawer-tools-logo" href="/" data-trackable="logo">
      <span className="o-header__visually-hidden">Financial Times</span>
    </a>
    {props.current && <p className="o-header__drawer-current-edition">{`${props.current.name} Edition`}</p>}
  </div>
)

const Search = () => (
  <div className="o-header__drawer-search">
    <form
      className="o-header__drawer-search-form"
      action="/search"
      role="search"
      aria-label="Site search"
      data-n-topic-search
      data-n-topic-search-categories="concepts,equities"
      data-n-topic-search-view-all
    >
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

const SectionPrimary = (props: TNavMenuItem) => {
  const sectionId = props.label.toLowerCase().replace(' ', '-')
  return (
    <React.Fragment>
      <h2 id={sectionId} className="o-header__drawer-menu-item o-header__drawer-menu-item--heading">
        {props.label}
      </h2>
      <ul aria-labelledby={sectionId} className="o-header__drawer-menu-list">
        {(props.submenu?.items as TNavMenuItem[]).map((item, index) => (
          <li key={item.url} className="o-header__drawer-menu-item">
            {item.submenu ? (
              <DrawerParentItem item={item} idSuffix={`${index}`} />
            ) : (
              <DrawerSingleItem {...item} />
            )}
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}

const SectionSecondary = (props: TNavMenuItem) => {
  const sectionId = props.label.toLowerCase().replace(' ', '-')
  return (
    <React.Fragment>
      <h2 id={sectionId} className="o-header__drawer-menu-item o-header__drawer-menu-item--heading">
        {props.label}
      </h2>
      <ul aria-labelledby={sectionId} className="o-header__drawer-menu-list">
        {(props.submenu?.items as TNavMenuItem[]).map((item, index) => (
          <li key={item.url} className="o-header__drawer-menu-item">
            {item.submenu ? (
              <DrawerParentItem item={item} idSuffix={'inner' + index} />
            ) : (
              <DrawerSingleItem {...item} />
            )}
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}

const SectionTertiary = (props: TNavMenuItem) => (
  <React.Fragment>
    <ul className="o-header__drawer-menu-list o-header__drawer-menu-list--divide">
      {(props.submenu?.items as TNavMenuItem[]).map((item) => (
        <li key={item.url} className={`o-header__drawer-menu-item`}>
          <DrawerSpecialItem {...item} />
        </li>
      ))}
    </ul>
  </React.Fragment>
)

const UserMenu = (props: TNavMenu) => (
  <nav className="o-header__drawer-menu o-header__drawer-menu--user" data-trackable="user-nav">
    <ul className="o-header__drawer-menu-list">
      {props.items.map((item) => (
        <li key={item.url} className="o-header__drawer-menu-item">
          <a className="o-header__drawer-menu-link" href={item.url ?? undefined} data-trackable={item.label}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
)

export { IncludeDrawer }
