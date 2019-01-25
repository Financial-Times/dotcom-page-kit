import * as React from 'react'

import { TEdition } from '../../typings/anvil-ui-ft-header'

import { MenuList } from './menu-items'

interface MenuEditionsProps {
  otherEditions: TEdition[]
}

const MenuEditions: React.FC<MenuEditionsProps> = ({ otherEditions }) => {
  return (
    <MenuList>
      {otherEditions.map(({ id, name, url }) => {
        const href = `${url}?edition=${id}`
        return (
          <li key={id} className="o-header__drawer-menu-item" data-trackable="edition-switcher">
            <a className="o-header__drawer-menu-link" href={href} data-trackable={id}>
              Switch to {name} Edition
            </a>
          </li>
        )
      })}
    </MenuList>
  )
}

export default MenuEditions
