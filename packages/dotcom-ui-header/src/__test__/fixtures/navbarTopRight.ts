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
    },
    {
      label: 'Restart Subscription',
      url: '/myaccount/subscription',
      submenu: null
    }
  ]
}

export default data
