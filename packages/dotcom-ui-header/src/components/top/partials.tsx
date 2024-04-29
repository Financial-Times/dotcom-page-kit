import React from 'react'
import { THeaderProps } from '../../interfaces'
import BrandFtMastheadSvg from '../svg-components/BrandFtMasthead'
import { TNavMenuItem } from '@financial-times/dotcom-types-navigation'
import { AskFtButton } from '../ask-ft/askFtButton'

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

const TopRightAccountEntry = ({
  className,
  signedIn,
  experimentalAccountEntryTest
}: {
  className?: string
  signedIn: boolean
  experimentalAccountEntryTest?: boolean
}) => {
  if (experimentalAccountEntryTest) {
    return <MyAccountLink signedIn={signedIn} />
  } else {
    return <MyFtLogoLink className={className} />
  }
}

const MyFtLogoLink = ({ className }: { className?: string }) => (
  <a
    className={`o-header__top-icon-link o-header__top-icon-link--myft ${className}`}
    id="o-header-top-link-myft"
    href="/myft"
    data-trackable="my-ft"
    data-tour-stage="myFt"
    aria-label="My F T"
  >
    <span className="o-header__visually-hidden">myFT</span>
  </a>
)

const MyAccountLink = ({ signedIn }: { signedIn: boolean }) => {
  const classNames = 'o-header__top-link ft-header__top-link--myaccount'

  if (signedIn) {
    return (
      <a
        className={classNames}
        id="o-header-top-link-myaccount"
        href="/myaccount"
        data-trackable="my-account"
      >
        <span>My Account</span>
      </a>
    )
  } else {
    return (
      <a
        className={classNames}
        id="o-header-top-link-signin"
        href="/login?location=/"
        data-trackable="Sign In"
      >
        <span>Sign In</span>
      </a>
    )
  }
}

const TopWrapper = (props) => (
  <div className="o-header__row o-header__top" data-trackable="header-top">
    <div className="o-header__container">
      <div className="o-header__top-wrapper">{props.children}</div>
    </div>
  </div>
)

const TopColumnLeft = (props: Pick<THeaderProps, 'showAskButton'>) => (
  <div className="o-header__top-column o-header__top-column--left">
    <DrawerIcon />
    <SearchIcon />
    {props.showAskButton && (
      <AskFtButton className="ft-header__top-ask-ft-button" dataTrackable="ask-ft-button-header" />
    )}
  </div>
)

const TopColumnCenter = () => (
  <div className="o-header__top-column o-header__top-column--center">
    <a
      className="o-header__top-logo"
      style={{ backgroundImage: 'none' }}
      data-trackable="logo"
      href="/"
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
      <TopRightAccountEntry
        className=""
        signedIn={true}
        experimentalAccountEntryTest={props.experimentalAccountEntryTest}
      />
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

const TopColumnRightAnon = ({
  items,
  variant,
  experimentalAccountEntryTest
}: {
  items: TNavMenuItem[]
  variant?: string
  experimentalAccountEntryTest?: boolean
}) => {
  // If user is anonymous the second list item is styled as a button
  const [signInAction, subscribeAction] = items

  return (
    <div className="o-header__top-column o-header__top-column--right">
      {subscribeAction && (
        <SubscribeButton item={subscribeAction} variant={variant} className="o-header__top-button--hide-m" />
      )}
      {signInAction && !experimentalAccountEntryTest && (
        <SignInLink item={signInAction} variant={variant} className="o-header__top-link--hide-m" />
      )}
      <TopRightAccountEntry
        className="o-header__top-icon-link--show-m"
        signedIn={false}
        experimentalAccountEntryTest={experimentalAccountEntryTest}
      />
    </div>
  )
}

const TopColumnRight = (props: THeaderProps) => {
  if (props.userIsLoggedIn) {
    return <TopColumnRightLoggedIn {...props} />
  } else {
    const userNavAnonItems = props.data['navbar-right-anon'].items
    return (
      <TopColumnRightAnon
        items={userNavAnonItems}
        variant={props.variant}
        experimentalAccountEntryTest={props.experimentalAccountEntryTest}
      />
    )
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
