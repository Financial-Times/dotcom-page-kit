import React from 'react'
import cc from 'classcat'

import { TItem, IDrawerItemProps } from '../../typings/anvil-ui-ft-header'

import { SectionHead, DrawerParentItem, DrawerSingleItem, DrawerSpecialItem } from './menu-items'

const defaultSectionProps: TItem = {
  label: '',
  submenu: { label: '', items: [] }
}

export const SectionPrimary: React.FC<IDrawerItemProps> = ({ label, submenu, isSelected }) => {
  return (
    <React.Fragment>
      <SectionHead>{label}</SectionHead>
      {submenu.items.map((item, index) => {
        return (
          <li key={item.url} className="o-header__drawer-menu-item">
            {item.submenu ? (
              <DrawerParentItem {...item} index={index} isSelected={isSelected} />
            ) : (
              <DrawerSingleItem {...item} isSelected={isSelected} />
            )}
          </li>
        )
      })}
    </React.Fragment>
  )
}

SectionPrimary.defaultProps = defaultSectionProps

export const SectionSecondary: React.FC<IDrawerItemProps> = ({ label, submenu, isSelected }) => {
  return (
    <React.Fragment>
      <SectionHead>{label}</SectionHead>
      {submenu.items.map((item) => {
        return (
          <li key={item.url} className="o-header__drawer-menu-item">
            <DrawerSingleItem {...item} isSelected={isSelected} />
          </li>
        )
      })}
    </React.Fragment>
  )
}

SectionSecondary.defaultProps = defaultSectionProps

export const SectionTertiary: React.FC<IDrawerItemProps> = ({ submenu, isSelected }) => {
  return (
    <React.Fragment>
      {submenu.items.map((item, index) => {
        const cls = cc([
          'o-header__drawer-menu-item',
          {
            'o-header__drawer-menu-item--divide': index === 0
          }
        ])

        return (
          <li key={item.url} className={cls}>
            <DrawerSpecialItem {...item} isSelected={isSelected} />
          </li>
        )
      })}
    </React.Fragment>
  )
}

SectionTertiary.defaultProps = defaultSectionProps
