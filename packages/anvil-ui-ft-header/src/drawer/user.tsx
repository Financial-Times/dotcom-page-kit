import React from 'react'

import { TItem } from '../../typings/anvil-ui-ft-header'

import { MenuList } from './menu-items'

interface UserProps {
  items?: TItem[]
}

const defaultProps: UserProps = {
  items: []
}

const User: React.FC<UserProps> = ({ items }) => {
  return (
    <nav className="o-header__drawer-menu o-header__drawer-menu--user" data-trackable="user-nav">
      <MenuList>
        {items.map(({ label, url }) => {
          return (
            <li key={url} className="o-header__drawer-menu-item">
              <a className="o-header__drawer-menu-link" href={url} data-trackable={label}>
                {label}
              </a>
            </li>
          )
        })}
      </MenuList>
    </nav>
  )
}

User.defaultProps = defaultProps

export default User
