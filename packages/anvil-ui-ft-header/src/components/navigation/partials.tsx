import React from 'react'

const NavMobile = ({ navbarSimple }) => {
  return (
    <nav
      id="o-header-nav-mobile"
      className="o-header__row o-header__nav o-header__nav--mobile"
      aria-hidden="true"
      data-trackable="header-nav:mobile">
      <ul className="o-header__nav-list">
        {navbarSimple.map((navItem, index) => {
          const selected = navItem.selected ? `aria-label="Current page" aria-current="true"` : null
          return (
            <li className="o-header__nav-item" key={`link-${index}`}>
              <a
                className="o-header__nav-link o-header__nav-link--primary"
                href={navItem.url}
                {...selected}
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

const NavListLeft = ({ navbarOptionsLeft }) => {
  return (
    <ul className="o-header__nav-list o-header__nav-list--left" data-trackable="primary-nav">
      {navbarOptionsLeft.map((navItem, index) => {
        const ariaAttributes = navItem.selected
          ? { 'aria-label': 'Current page', 'aria-current': true }
          : null
        return (
          <li className="o-header__nav-item" key={`link-${index}`}>
            <a
              className="o-header__nav-link o-header__nav-link--primary"
              href={navItem.url}
              id={`o-header-link-${index}`}
              {...ariaAttributes}
              data-trackable={navItem.label}>
              {navItem.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

const ChooseNavListRight = ({ props }) => {
  // Serve the signed-in or anonymous user experience
  const right = props['navbar-right'].items
  const rightanon = props['navbar-right-anon'].items
  let navListRight
  if (props.userNav) {
    if (props.userIsAnonymous) {
      navListRight = NavListRightAnon(rightanon)
    } else {
      navListRight = NavListRight(right)
    }
  } else {
    navListRight = null
  }
  return navListRight
}

const NavListRight = (navbarOptionsRight) => {
  return (
    <ul className="o-header__nav-list o-header__nav-list--right" data-trackable="user-nav">
      {navbarOptionsRight.map((navItem, index) => {
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

const NavListRightAnon = (navbarOptionsRight) => {
  // If user is anonymous the second list item is styled as a button
  const [first, second] = navbarOptionsRight
  return (
    <ul className="o-header__nav-list o-header__nav-list--right" data-trackable="user-nav">
      <li className="o-header__nav-item">
        <a className="o-header__nav-link" href={first.url} data-trackable={first.label}>
          {first.label}
        </a>
      </li>
      <li className="o-header__nav-item">
        <a className="o-header__nav-button" href={second.url} data-trackable={second.label}>
          {second.label}
        </a>
      </li>
    </ul>
  )
}

const UserActionsNav = ({ props }) => {
  const userNavItems = props['navbar-right-anon'].items
  return props.userIsAnonymous ? ( // level above
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
  ) : null
}

export { NavDesktop, NavMobile, NavListLeft, ChooseNavListRight, UserActionsNav }
