export interface TFooterProps {
  data: Array<FooterSection>
  theme?: 'dark' | 'light' | string
}

interface FooterSection {
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
