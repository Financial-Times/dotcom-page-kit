import React from 'react'
import { THeaderProps } from '../../interfaces'
import { ariaSelected } from '../../utils'
import {
  TNavMenuItem,
  TNavMeganav,
  INavMeganavSections,
  INavMeganavArticles
} from '@financial-times/dotcom-types-navigation'

const MobileNav = (props: THeaderProps) => {
  // Only display navigation on pages which are included in this menu
  const targetUrls = props.data['navbar-simple'].items.map((item) => item.url)

  return props.data.currentPath && targetUrls.includes(props.data.currentPath) ? (
    <NavMobile items={props.data['navbar-simple'].items} />
  ) : null
}

const NavMobile = ({ items }: { items: TNavMenuItem[] }) => {
  return (
    <nav
      id="o-header-nav-mobile"
      className="o-header__row o-header__nav o-header__nav--mobile"
      data-trackable="header-nav:mobile"
    >
      <ul className="o-header__nav-list">
        {items.map((item, index) => (
          <li className="o-header__nav-item" key={`link-${index}`}>
            <a
              className="o-header__nav-link o-header__nav-link--primary"
              href={item.url ?? undefined}
              {...ariaSelected(item)}
              data-trackable={item.label}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const NavDesktop = (props) => (
  <nav
    id="o-header-nav-desktop"
    className="o-header__row o-header__nav o-header__nav--desktop"
    role="navigation"
    aria-label="Primary navigation"
    data-trackable="header-nav:desktop"
  >
    <div className="o-header__container">{props.children}</div>
  </nav>
)

const NavListLeft = (props: THeaderProps) => (
  <ul className="o-header__nav-list o-header__nav-list--left" data-trackable="primary-nav">
    {props.data.navbar.items.map((item, index) => (
      <li className="o-header__nav-item" key={`link-${index}`}>
        <a
          className="o-header__nav-link o-header__nav-link--primary"
          href={item.url ?? undefined}
          id={`o-header-link-${index}`}
          {...ariaSelected(item)}
          data-trackable={item.label}
        >
          {item.label}
        </a>
        {props.showMegaNav && Array.isArray(item.meganav) ? (
          <MegaNav meganav={item.meganav} label={item.label} index={index} />
        ) : null}
      </li>
    ))}
  </ul>
)

const NavListRight = (props: THeaderProps) => {
  let navbarRightItems = props.data['navbar-right'].items;

  // If the pro navigation is to be shown
  // Remove the myFT link from the right navigation
  // since there will be a link to it in the pro navigation
  if(props.showProNavigation) {
    navbarRightItems = navbarRightItems.filter(item => item.label !== 'myFT');
  }

  return props.userIsLoggedIn ? (
    <NavListRightLoggedIn
      items={navbarRightItems}
    />
  ) : null
}

const NavListRightLoggedIn = ({
  items,
}: {
  items: TNavMenuItem[]
}) => {
  return (
    <ul
      data-component="nav-list--right"
      className="o-header__nav-list o-header__nav-list--right"
      data-trackable="user-nav"
    >
      {items.map((item, index) => (
        <li className="o-header__nav-item" key={`link-${index}`}>
            <a className="o-header__nav-link" href={item.url ?? undefined} data-trackable={item.label}>
              {item.label}
            </a>
        </li>
      ))}
    </ul>
  )
}

const MegaNav = ({ label, meganav, index }: { label: string; meganav: TNavMeganav[]; index: number }) => {
  const sections = meganav.find(({ component }) => component === 'sectionlist')
  const articles = meganav.find(({ component }) => component === 'articlelist')

  return (
    <div
      className="o-header__mega"
      id={`o-header-mega-${index}`}
      role="group"
      aria-labelledby={`o-header-link-${index}`}
      data-o-header-mega
      data-trackable={`meganav | ${label}`}
    >
      <div className="o-header__container">
        <div className="o-header__mega-wrapper">
          {sections ? <SectionList {...(sections as INavMeganavSections)} /> : null}
          {articles ? <ArticleList {...(articles as INavMeganavArticles)} /> : null}
        </div>
      </div>
    </div>
  )
}

const SectionList = ({ title, data }: INavMeganavSections) => {
  return (
    <div className="o-header__mega-column o-header__mega-column--subsections" data-trackable="sections">
      <div className="o-header__mega-heading">{title}</div>
      <div className="o-header__mega-content">
        <ul className="o-header__mega-list">
          {data?.map((column) =>
            column.map((item, index) => (
              <li className="o-header__mega-item" key={`link-${index}`}>
                <a
                  className="o-header__mega-link"
                  href={item.url ?? undefined}
                  {...ariaSelected(item)}
                  data-trackable="link"
                >
                  {item.label}
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

const ArticleList = ({ title, data }: INavMeganavArticles) => {
  return (
    <div className="o-header__mega-column o-header__mega-column--articles" data-trackable="popular">
      <div className="o-header__mega-heading">{title}</div>
      <div className="o-header__mega-content">
        <ul className="o-header__mega-list">
          {data?.map((item, index) => (
            <li className="o-header__mega-item" key={`link-${index}`}>
              <a
                className="o-header__mega-link"
                href={item.url ?? undefined}
                {...ariaSelected(item)}
                data-trackable="link"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const UserActionsNav = (props: THeaderProps) => {
  const userNavItems = props.data['navbar-right-anon'].items

  return (
    <div className="o-header__row o-header__anon" data-trackable="header-anon">
      <ul className="o-header__anon-list">
        {userNavItems.map((item, index) => (
          <li className="o-header__anon-item" key={`link-${index}`}>
            <a className="o-header__anon-link" href={item.url ?? undefined} data-trackable={item.label}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { NavDesktop, NavListLeft, NavListRight, UserActionsNav, MobileNav }
