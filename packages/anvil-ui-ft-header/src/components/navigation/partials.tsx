import React from 'react'

const NavSimple = ({ navbarSimple }) => {
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

const Nav = (props) => {
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
  return props.userNav && !props.userIsAnonymous ? NavListRight(right) : NavListRightAnon(rightanon)
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

const NavListRightAnonFirst = (navItem) => {
  return (
    <li className="o-header__nav-item">
      <a className="o-header__nav-link" href={navItem.url} data-trackable={navItem.label}>
        {navItem.label}
      </a>
    </li>
  )
}

const NavListRightAnonSecond = (navItem) => {
  return (
    <li className="o-header__nav-item">
      <a className="o-header__nav-button" href={navItem.url} data-trackable={navItem.label}>
        {navItem.label}
      </a>
    </li>
  )
}

const NavListRightAnon = (navbarOptionsRight) => {
  return (
    <ul className="o-header__nav-list o-header__nav-list--right" data-trackable="user-nav">
      <NavListRightAnonFirst navItem={navbarOptionsRight[0]} />
      <NavListRightAnonSecond navItem={navbarOptionsRight[1]} />
    </ul>
  )
}

export { Nav, NavSimple, NavListLeft, ChooseNavListRight }
