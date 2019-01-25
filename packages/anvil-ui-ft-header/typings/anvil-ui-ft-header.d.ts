export type TEdition = {
  id: string
  name: string
  url: string
}

export type TItem = {
  label: string
  url?: string
  submenu?: TItemSubMenu
}

export type TItemSubMenu = {
  label: string
  items?: TItem[]
}

export interface IDrawerProps {
  sections: TItem[]
  user: TItem[]
  editions?: {
    current: { name: string }
    others: TEdition[]
  }
  currentUrl?: string
}

export interface IDrawerItemProps extends TItem {
  isSelected: (url: string) => boolean
}

export interface IDrawerParentProps extends IDrawerItemProps {
  index: number
}
