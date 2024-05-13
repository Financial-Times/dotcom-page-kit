import { TNavMenu } from '@financial-times/dotcom-types-navigation'

const data: TNavMenu = {
  label: 'Navigation',
  items: [
    {
      label: 'Portfolio',
      url: 'https://markets.ft.com/data/portfolio/dashboard',
      submenu: null
    },
    {
      label: 'myFT Feed',
      url: 'https://www.ft.com/myft',
      submenu: null
    }
  ]
}

export default data
