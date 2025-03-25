import React from 'react'

export interface DropdownMenuProps {
  buttonIcon?: string
  headerContent: string | React.ReactNode
  listToDisplay: {
    id: string
    title: string
    href: string
    icon: string
    hasAccess: boolean
    hasLabel: boolean
    hasBottomLine: boolean
  }[]
  label?: React.ReactNode
  trackingKey: string
}

type DropdownMenuButtonProps = Pick<DropdownMenuProps, 'buttonIcon' | 'trackingKey'>

type DropdownMenuHeaderProps = Pick<DropdownMenuProps, 'headerContent'>

type DropdownMenuListProps = Pick<DropdownMenuProps, 'listToDisplay' | 'label' | 'trackingKey'>

export const DropdownMenu = ({
  buttonIcon,
  headerContent,
  listToDisplay,
  label,
  trackingKey
}: DropdownMenuProps) => {
  return (
    <nav className="o-header__dropdown" aria-describedby="dropdown-title">
      {/* Tab index here is needed for making sure safari and ios browsers dropdown behavior works */}
      <DropdownMenuButton buttonIcon={buttonIcon} trackingKey={trackingKey} />
      <div
        className="o-header__dropdown-content"
        tabIndex={-1}
        id="dropdown-options"
        data-id="dropdown-content"
        data-o-tracking-view={`${trackingKey}_component_view`}
      >
        <DropdownMenuHeader headerContent={headerContent} />
        <DropdownMenuList listToDisplay={listToDisplay} label={label} trackingKey={trackingKey} />
      </div>
    </nav>
  )
}

const DropdownMenuButton: React.FC<DropdownMenuButtonProps> = ({ buttonIcon = 'user', trackingKey }) => (
  <button
    data-trackable={`${trackingKey}_toggle_click`}
    className="o-header__dropdown-button"
    tabIndex={0}
    aria-label="Dropdown menu has opened on focus, press Tab to access links."
    aria-controls="dropdown-options"
  >
    <div className={`o-header__dropdown-button-user-icon-wrapper`}>
      <span className={`o-header__dropdown-icon ${buttonIcon}-icon`} aria-hidden="true" />
    </div>
    <span className="o-header__dropdown-icon chevron-icon" aria-hidden="true" />
  </button>
)

const DropdownMenuHeader: React.FC<React.PropsWithChildren<DropdownMenuHeaderProps>> = ({
  headerContent
}) => (
  <div className="o-header__dropdown-header">
    {typeof headerContent === 'string' ? (
      <span className="o-header__dropdown-title" id="dropdown-title">
        {headerContent}
      </span>
    ) : (
      <React.Fragment>{headerContent}</React.Fragment>
    )}
    {/* Tab index again needed for safari and ios browsers */}
    <button
      className="o-header__dropdown-close-button-mobile"
      tabIndex={0}
      aria-label="Close dropdown menu"
    />
  </div>
)

const DropdownMenuList: React.FC<DropdownMenuListProps> = ({ listToDisplay, label, trackingKey }) => (
  <ul className="o-header__dropdown-list">
    {listToDisplay.map((link) => (
      <li
        key={link.id}
        className={`o-header__dropdown-list-item ${link.hasBottomLine && 'o-header__dropdown-list-divider'}`}
      >
        <a
          className="o-header__dropdown-list-item-link"
          href={link.href}
          data-trackable={`${trackingKey}_${link.id}_clicked`}
        >
          <div className="o-header__dropdown-list-item-details-container">
            <span
              className={`o-header__dropdown-icon ${link.hasAccess ? link.icon + '-icon' : 'lock-icon'}`}
              aria-hidden="true"
            />
            <span>{link.title}</span>
          </div>
          {link.hasLabel && <React.Fragment>{label}</React.Fragment>}
        </a>
      </li>
    ))}
  </ul>
)

export const ProfessionalLabel = () => (
  <span className="o-header__dropdown-list-pro-label">FT PROFESSIONAL</span>
)
