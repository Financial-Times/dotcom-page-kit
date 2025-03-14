import React from 'react'
import DROPDOWN_DEFAULT_LIST from './dropDownProfessionalList.json';

export interface DropdownMenuProps {
  listToDisplay?: {
    id: string,
    label: string,
    href: string,
    icon: string,
    hasAccess: boolean,
    isProfessional: boolean,
    hasBottomLine: boolean
  }[];
  headerTitle?: string;
}

export const DropdownMenu = ({
    listToDisplay = DROPDOWN_DEFAULT_LIST,
    headerTitle = 'FT PROFESSIONAL ACCOUNT'
  }: DropdownMenuProps) => {
  return (
    <div className="o-header__professional-dropdown">
      {/* Tab index here is needed for making sure safari and ios browsers dropdown behavior works */}
      <button tabIndex={0} className="o-header__professional-dropdown-button">
        <span className="o-header__professional-dropdown-icon user-icon" />
        <span className="o-header__professional-dropdown-icon chevron-icon" />
      </button>

      <div className="o-header__professional-dropdown-content" tabIndex={-1}>
        <div className="o-header__professional-dropdown-title-wrapper">
          <span className="o-header__professional-dropdown-title">{headerTitle}</span>
          {/* Tab index again needed for safari and ios browsers */}
          <button tabIndex={0} className="o-header__professional-dropdown-icon cross-icon" />
        </div>

        <ul className="o-header__professional-dropdown-list">
          {listToDisplay.map(link => (
            <li key={link.id} className={`o-header__professional-dropdown-list-item ${link.hasBottomLine && 'o-header__professional-dropdown-list-divider'}`} >
              <a className="o-header__professional-dropdown-list-item-link" href={link.href}>
                <span className={`o-header__professional-dropdown-icon ${link.hasAccess ? link.icon + '-icon' : 'lock-icon'}`} />
                <span>{link.label}</span>
                {link.isProfessional && <span className="o-header__professional-dropdown-list-pro-label">FT PROFESSIONAL</span>}
              </a>
            </li>
          ))}
        </ul >
      </div>
    </div>
  )
}