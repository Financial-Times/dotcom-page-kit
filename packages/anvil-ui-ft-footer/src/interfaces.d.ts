export interface Props {
  themeLight?: boolean
  data: Array<FooterDataItem>
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
