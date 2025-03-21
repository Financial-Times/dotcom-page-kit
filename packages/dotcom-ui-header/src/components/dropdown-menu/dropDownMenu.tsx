import React from 'react'

export interface DropdownMenuProps {
  listToDisplay: {
    id: string,
    label: string,
    href: string,
    icon: string,
    hasAccess: boolean,
    isProfessional: boolean,
    hasBottomLine: boolean
  }[];
  headerTitle: string;
}

export const DropdownMenu = ({
  listToDisplay,
  headerTitle
}: DropdownMenuProps) => {
  return (
    <nav className="o-header__professional-dropdown" aria-describedby="dropdown-title">
      {/* Tab index here is needed for making sure safari and ios browsers dropdown behavior works */}
      <button
        data-trackable="dropdown-toggle"
        className="o-header__professional-dropdown-button"
        tabIndex={0}
        aria-label="Dropdown menu has opened on focus, press Tab to access links."
        aria-controls="dropdown-options"
      >
        <div className="o-header__professional-dropdown-button-user-icon-wrapper">
          <span className="o-header__professional-dropdown-icon user-icon" aria-hidden="true" />
        </div>
        <span className="o-header__professional-dropdown-icon chevron-icon" aria-hidden="true" />
      </button>

      <div
        className="o-header__professional-dropdown-content"
        tabIndex={-1}
        id="dropdown-options"
        data-id="dropdown-content"
        data-o-tracking-view
      >
        <div className="o-header__professional-dropdown-title-wrapper">
          <span className="o-header__professional-dropdown-title" id="dropdown-title">{headerTitle}</span>
          {/* Tab index again needed for safari and ios browsers */}
          <button
            data-trackable="dropdown-close-mobile"
            className="o-header__professional-dropdown-close-button-mobile"
            tabIndex={0}
            aria-label="Close dropdown menu"
          />
        </div>

        <ul className="o-header__professional-dropdown-list">
          {listToDisplay.map(link => (
            <li key={link.id} className={`o-header__professional-dropdown-list-item ${link.hasBottomLine && 'o-header__professional-dropdown-list-divider'}`} >
              <a className="o-header__professional-dropdown-list-item-link" href={link.href}>
                <div className="o-header__professional-dropdown-list-item-details-container">
                  <span className={`o-header__professional-dropdown-icon ${link.hasAccess ? link.icon + '-icon' : 'lock-icon'}`} aria-hidden="true" />
                  <span>{link.label}</span>
                </div>
                {link.isProfessional && <span className="o-header__professional-dropdown-list-pro-label">FT PROFESSIONAL</span>}
              </a>
            </li>
          ))}
        </ul >
      </div>
    </nav>
  )
}