import React from 'react'
import { NavListProps, THeaderProps } from '../../interfaces'
import { ariaSelected } from '../../utils'

const MobileNav = (props) => {
  const targetUrls = props.data['navbar-simple'].items.map((item) => item.url)
  return targetUrls.includes(props.data.currentPath) ? (
    <NavMobile data={props.data['navbar-simple'].items} />
  ) : null
}

const NavMobile = ({ data }) => {
  return (
    <nav
      id="o-header-nav-mobile"
      className="o-header__row o-header__nav o-header__nav--mobile"
      aria-hidden="true"
      data-trackable="header-nav:mobile">
      <ul className="o-header__nav-list">
        {data.map((navItem, index) => {
          return (
            <li className="o-header__nav-item" key={`link-${index}`}>
              <a
                className="o-header__nav-link o-header__nav-link--primary"
                href={navItem.url}
                {...ariaSelected(navItem)}
                data-trackable={navItem.name}>
                {navItem.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

const NavDesktop = (props) => {
  return (
    <nav
      id="o-header-nav-desktop"
      className="o-header__row o-header__nav o-header__nav--desktop"
      role="navigation"
      aria-label="Primary navigation"
      data-trackable="header-nav:desktop">
      <div className="o-header__container">{props.children}</div>
    </nav>
  )
}

const NavListLeft = ({ navItems }) => {
  return (
    <ul className="o-header__nav-list o-header__nav-list--left" data-trackable="primary-nav">
      {navItems.map((navItem, index) => {
        return (
          <li className="o-header__nav-item" key={`link-${index}`}>
            <a
              className="o-header__nav-link o-header__nav-link--primary"
              href={navItem.url}
              id={`o-header-link-${index}`}
              {...ariaSelected(navItem)}
              data-trackable={navItem.label}>
              {navItem.label}
            </a>
            <MegaNav navItem={navItem} index={navItems.indexOf(navItem)} />
          </li>
        )
      })}
    </ul>
  )
}

const NavListRight = (props: THeaderProps) => {
  // Serve the signed-in or anonymous user experience
  const navbarKey = props.userIsAnonymous ? 'navbar-right-anon' : 'navbar-right'
  const navbarOptions = props.data[navbarKey].items

  if (props.showUserNav) {
    if (props.userIsAnonymous) {
      return NavListRightAnon({ navbarOptions })
    } else {
      return NavListRightLoggedIn({ navbarOptions })
    }
  } else {
    return null
  }
}

const NavListRightLoggedIn = ({ navbarOptions }: NavListProps) => {
  return (
    <ul className="o-header__nav-list o-header__nav-list--right" data-trackable="user-nav">
      {navbarOptions.map((navItem, index) => {
        return (
          <li className="o-header__nav-item" key={`link-${index}`}>
            <a className="o-header__nav-link" href={navItem.url} data-trackable={navItem.label}>
              {navItem.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

const NavListRightAnon = ({ navbarOptions, variant }: NavListProps) => {
  // If user is anonymous the second list item is styled as a button
  const [first, second] = navbarOptions
  const setTabIndex = variant === 'sticky' ? { tabIndex: -1 } : null
  return (
    <ul className="o-header__nav-list o-header__nav-list--right" data-trackable="user-nav">
      <li className="o-header__nav-item">
        <a className="o-header__nav-link" href={first.url} data-trackable={first.label} {...setTabIndex}>
          {first.label}
        </a>
      </li>
      <li className="o-header__nav-item">
        <a className="o-header__nav-button" href={second.url} data-trackable={second.label} {...setTabIndex}>
          {second.label}
        </a>
      </li>
    </ul>
  )
}

const MegaNav = ({ navItem, index }) => {
  return Array.isArray(navItem.meganav) ? (
    <div
      className="o-header__mega"
      id={`o-header-mega-${index}`}
      role="group"
      aria-labelledby={`o-header-link-${index}`}
      data-o-header-mega
      data-trackable={`meganav | ${navItem.label}`}>
      <div className="o-header__container">
        <div className="o-header__mega-wrapper">
          <SectionList sectionItem={navItem.meganav[0]} />
          <ArticleList articleItem={navItem.meganav[1]} />
        </div>
      </div>
    </div>
  ) : null
}

const SectionList = ({ sectionItem }) => {
  return (
    <div className="o-header__mega-column o-header__mega-column--subsections" data-trackable="sections">
      <div className="o-header__mega-heading">{sectionItem.title}</div>
      <div className="o-header__mega-content">
        <ul className="o-header__mega-list">
          {Array.isArray(sectionItem.data)
            ? sectionItem.data.map((column) => {
                return column.map((item, index) => {
                  return (
                    <li className="o-header__mega-item" key={`link-${index}`}>
                      <a
                        className="o-header__mega-link"
                        href={item.url}
                        {...ariaSelected(item)}
                        data-trackable="link">
                        {item.label}
                      </a>
                    </li>
                  )
                })
              })
            : null}
        </ul>
      </div>
    </div>
  )
}

const ArticleList = ({ articleItem }) => {
  return (
    <div className="o-header__mega-column o-header__mega-column--subsections" data-trackable="sections">
      <div className="o-header__mega-heading">{articleItem.title}</div>
      <div className="o-header__mega-content">
        <ul className="o-header__mega-list">
          {articleItem.data
            ? articleItem.data.map((item, index) => {
                return (
                  <li className="o-header__mega-item" key={`link-${index}`}>
                    <a
                      className="o-header__mega-link"
                      href={item.url}
                      {...ariaSelected(item)}
                      data-trackable="link">
                      {item.label}
                    </a>
                  </li>
                )
              })
            : null}
        </ul>
      </div>
    </div>
  )
}

const UserActionsNav = (props) => {
  const userNavItems = props.data['navbar-right-anon'].items
  return (
    <div className="o-header__row o-header__anon" data-trackable="header-anon">
      <ul className="o-header__anon-list">
        {userNavItems.map((item, index) => {
          return (
            <li className="o-header__anon-item" key={`link-${index}`}>
              <a className="o-header__anon-link" href={item.url} data-trackable={item.label}>
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { NavDesktop, NavListLeft, NavListRight, NavListRightAnon, UserActionsNav, MobileNav }
