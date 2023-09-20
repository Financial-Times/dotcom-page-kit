import React from 'react'
import { THeaderProps } from '../../interfaces'
import BrandFtMastheadSvg from '../svg-components/BrandFtMasthead'
import { TNavMenuItem } from '@financial-times/dotcom-types-navigation'

const HeaderWrapper = (props) => (
  <header
    id="site-navigation"
    className={`o-header o-header--${props.variant || 'simple'}`}
    data-o-component="o-header"
    data-o-header--no-js={true}
    tabIndex={-1}
  >
    {props.children}
  </header>
)

const DrawerIcon = () => (
  <a
    href="#o-header-drawer"
    className="o-header__top-icon-link o-header__top-icon-link--menu"
    aria-controls="o-header-drawer"
    title="Open side navigation menu"
    data-trackable="drawer-toggle"
  >
    <span className="o-header__top-link-label">Open side navigation menu</span>
  </a>
)

const SearchIcon = () => (
  <a
    href={`#o-header-search-primary`}
    className="o-header__top-icon-link o-header__top-icon-link--search"
    aria-controls={`o-header-search-primary`}
    title="Open search bar"
    data-trackable="search-toggle"
  >
    <span className="o-header__top-link-label">Open search bar</span>
  </a>
)

const MyFt = ({ className, items }: { className?: string; items?: TNavMenuItem[] }) => {
  const ftUrl = items?.find((el) => el.label === 'myFT')?.url
  return (
    <a
      className={`o-header__top-icon-link o-header__top-icon-link--myft ${className}`}
      id="o-header-top-link-myft"
      href={ftUrl ?? '/myft'}
      data-trackable="my-ft"
      data-tour-stage="myFt"
      aria-label="My F T"
    >
      <span className="o-header__visually-hidden">myFT</span>
    </a>
  )
}

const TopWrapper = (props) => (
  <div className="o-header__row o-header__top" data-trackable="header-top">
    <div className="o-header__container">
      <div className="o-header__top-wrapper">{props.children}</div>
    </div>
  </div>
)

const TopColumnLeft = () => (
  <div className="o-header__top-column o-header__top-column--left">
    <DrawerIcon />
    <SearchIcon />
  </div>
)

const TopColumnCenter = ({ url }: { url?: string }) => (
  <div className="o-header__top-column o-header__top-column--center">
    <a
      className="o-header__top-logo"
      style={{ backgroundImage: 'none' }}
      data-trackable="logo"
      href={url ?? '/'}
      title="Go to Financial Times homepage"
    >
      <BrandFtMastheadSvg title="Financial Times" />
    </a>
  </div>
)

const TopColumnCenterNoLink = () => (
  <div className="o-header__top-column o-header__top-column--center">
    <div className="o-header__top-logo" style={{ backgroundImage: 'none' }}>
      <BrandFtMastheadSvg title="Financial Times" />
    </div>
  </div>
)

const TopColumnRightLoggedIn = (props: THeaderProps) => {
  const subscribeAction = props.data['navbar-right-anon']?.items?.[1]
  return (
    <div className="o-header__top-column o-header__top-column--right">
      {!props.userIsSubscribed && subscribeAction && (
        <SubscribeButton
          item={subscribeAction}
          variant={props.variant}
          className="o-header__top-button--hide-m"
        />
      )}
      <MyFt className="" items={props.data?.account?.items} />
    </div>
  )
}

const SignInLink = ({
  item,
  variant,
  className
}: {
  item: TNavMenuItem
  variant?: string
  className?: string
}) => {
  const setTabIndex = variant === 'sticky' ? { tabIndex: -1 } : null
  return (
    <a
      className={`o-header__top-link ${className}`}
      href={item.url ?? undefined}
      data-trackable={item.label}
      {...setTabIndex}
    >
      {item.label}
    </a>
  )
}
const SubscribeButton = ({
  item,
  variant,
  className
}: {
  item: TNavMenuItem
  variant?: string
  className?: string
}) => {
  const setTabIndex = variant === 'sticky' ? { tabIndex: -1 } : null
  return (
    <a
      className={`o-header__top-button ${className}`}
      // Added as the result of a DAC audit. This will be confusing for users of voice activation software
      // as it looks like a button but behaves like a link without this role.
      role="button"
      href={item.url ?? undefined}
      data-trackable={item.label}
      {...setTabIndex}
    >
      {item.label}
    </a>
  )
}

const TopColumnRightAnon = ({ items, variant }: { items: TNavMenuItem[]; variant?: string }) => {
  // If user is anonymous the second list item is styled as a button
  const [signInAction, subscribeAction] = items
  return (
    <div className="o-header__top-column o-header__top-column--right">
      {subscribeAction && (
        <SubscribeButton item={subscribeAction} variant={variant} className="o-header__top-button--hide-m" />
      )}
      {signInAction && (
        <SignInLink item={signInAction} variant={variant} className="o-header__top-link--hide-m" />
      )}
      <MyFt className="o-header__top-icon-link--show-m" items={items} />
    </div>
  )
}

const TopColumnRight = (props: THeaderProps) => {
  if (props.userIsLoggedIn) {
    return <TopColumnRightLoggedIn {...props} />
  } else {
    const userNavAnonItems = props.data['navbar-right-anon'].items
    const userNavAccountItems = props.data.account?.items ?? []
    return <TopColumnRightAnon items={userNavAnonItems.concat(userNavAccountItems)} variant={props.variant} />
  }
}

export {
  HeaderWrapper,
  TopWrapper,
  TopColumnLeft,
  TopColumnCenter,
  TopColumnCenterNoLink,
  TopColumnRight,
  TopColumnRightAnon,
  SubscribeButton,
  SignInLink
}
