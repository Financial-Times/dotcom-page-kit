import React from 'react'
import DROPDOWN_DEFAULT_LIST from './dropDownProfessionalList.json';

export const DropdownMenu: React.FC = () => {

  return <div className="o-header__professional-dropdown">
    <button aria-haspopup="true" aria-expanded="false" tabIndex={0} className="o-header__professional-dropdown-button">Menu</button>
    <div className="o-header__professional-dropdown-content">
      <div className="o-header__professional-dropdown-title-wrapper">
        <span className="o-header__professional-dropdown-title">FT PROFESSIONAL ACCOUNT</span>
        <button className='o-header__professional-dropdown-close-icon cross-icon'/>
      </div>
      <ul className="o-header__professional-dropdown-list-wrapper">
        {DROPDOWN_DEFAULT_LIST.map(link => (
          <li key={link.id} className={`o-header__professional-dropdown-list-item ${link.hasBottomLink && 'o-header__professional-dropdown-list-divider'}`} >
            <a className="o-header__professional-dropdown-list-item-link" href={link.href}>
              <span className={`o-header__professional-dropdown-list-icon ${link.hasAccess ? link.icon + '-icon' : 'lock-icon'}`} />
              <span>{link.label}</span>
              {link.isProfessional && <span className="o-header__professional-dropdown-list-pro-label">FT PROFESSIONAL</span>}
            </a>
          </li>
        ))}
      </ul >
    </div>
  </div >
}
