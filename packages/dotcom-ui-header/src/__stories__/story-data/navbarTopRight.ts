import { TNavMenu } from '@financial-times/dotcom-types-navigation'

const data: TNavMenu = {
  label: 'Navigation',
  items: [
    {
      label: 'My Account',
      url: '/myaccount',
      submenu: null
    },
    {
      label: 'Subscribe',
      url: '/products?segmentId=#',
      submenu: null
    }
  ]
}

export default data
