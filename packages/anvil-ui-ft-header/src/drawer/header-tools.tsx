import * as React from 'react'

export interface HeaderToolsProps {
  editions?: {
    current: {
      name: string
    }
  }
}

const HeaderTools: React.FC<HeaderToolsProps> = ({ editions }) => {
  return (
    <div className="o-header__drawer-tools">
      <button
        className="o-header__drawer-tools-close"
        type="button"
        title="Close drawer menu"
        aria-controls="o-header-drawer"
        data-trackable="close">
        <span className="o-header__visually-hidden">Close</span>
      </button>

      <a className="o-header__drawer-tools-logo" href="/" data-trackable="logo">
        <span className="o-header__visually-hidden">Financial Times</span>
      </a>

      {editions && <p className="o-header__drawer-current-edition">{editions.current.name} Edition</p>}
    </div>
  )
}

export default HeaderTools
