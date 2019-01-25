import * as React from 'react'

import { IDrawerProps } from '../../typings/anvil-ui-ft-header'

import { Root, MenuList } from './menu-items'
import * as Menu from './menu-sections'
import MenuEditions from './menu-editions'
import HeaderTools from './header-tools'
import Search from './search'
import User from './user'
import { isCurrentUrl } from './utils'

const defaultDrawerProps: IDrawerProps = {
  user: [],
  sections: [{ label: '', url: '' }, { label: '', url: '' }, { label: '', url: '' }],
  currentUrl: '/'
}

const Drawer: React.FC<IDrawerProps> = ({ sections, editions, user, currentUrl }) => {
  const isSelected = isCurrentUrl(currentUrl)

  return (
    <Root>
      <HeaderTools editions={editions} />
      <Search />

      <nav className="o-header__drawer-menu o-header__drawer-menu--primary o-header__drawer-homepage">
        {editions && <MenuEditions otherEditions={editions.others} />}

        <MenuList>
          <Menu.SectionPrimary {...sections[0]} isSelected={isSelected} />
          <Menu.SectionSecondary {...sections[1]} isSelected={isSelected} />
          <Menu.SectionTertiary {...sections[2]} isSelected={isSelected} />
        </MenuList>
      </nav>

      <User items={user} />
    </Root>
  )
}

Drawer.defaultProps = defaultDrawerProps

export default Drawer
