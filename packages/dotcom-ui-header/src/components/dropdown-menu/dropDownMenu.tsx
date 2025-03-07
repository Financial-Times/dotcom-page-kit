import React from 'react'

export const DropdownMenu: React.FC = () => (
  <div className="o-header__professional-dropdown">
    <button aria-haspopup="true" aria-expanded="false" id="dropdownButton">
      Pro Menu
    </button>
    <div className="o-header__professional-dropdown-content" aria-labelledby="dropdownButton">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </div>
)
