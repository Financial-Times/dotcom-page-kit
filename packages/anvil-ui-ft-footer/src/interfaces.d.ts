export interface Props {
  data: Array<FooterDataItem>
  theme?: 'light' | 'dark' | string
  legalOnly?: boolean
}

interface FooterDataItem {
  label: string
  submenu: FooterSubmenu
}

interface FooterSubmenu {
  items: Array<Array<FooterSubmenuItem>>
}

interface FooterSubmenuItem {
  label: string
  url: string
  disableTracking?: boolean
}
