import { TNavMenu } from '../../../dotcom-types-navigation'

const data: TNavMenu = {
  label: 'Footer',
  items: [
    {
      label: 'Support',
      url: null,
      submenu: {
        label: null,
        items: [
          [
            {
              label: 'View Site Tips',
              url: '/tour',
              submenu: null
            },
            {
              label: 'Help Centre',
              url: 'http://help.ft.com',
              submenu: null
            },
            {
              label: 'About Us',
              url: 'http://www.ft.com/aboutus',
              submenu: null
            },
            {
              label: 'Accessibility',
              url: '/accessibility',
              submenu: null
            },
            {
              label: 'myFT Tour',
              url: '/tour/myft',
              submenu: null
            }
          ]
        ]
      }
    },
    {
      label: 'Legal & Privacy',
      url: null,
      submenu: {
        label: null,
        items: [
          [
            {
              label: 'Terms & Conditions',
              url: 'http://help.ft.com/help/legal-privacy/terms-conditions/',
              submenu: null
            },
            {
              label: 'Privacy',
              url: 'http://help.ft.com/help/legal-privacy/privacy/',
              submenu: null
            },
            {
              label: 'Cookies',
              url: 'http://help.ft.com/help/legal-privacy/cookies/',
              submenu: null
            },
            {
              label: 'Copyright',
              url: 'http://help.ft.com/help/legal-privacy/copyright/copyright-policy/',
              submenu: null
            },
            {
              label: 'Slavery Statement & Policies',
              url: 'https://help.ft.com/help/legal/slavery-statement/',
              submenu: null
            }
          ]
        ]
      }
    },
    {
      label: 'Services',
      url: null,
      submenu: {
        label: null,
        items: [
          [
            {
              label: 'FT Live',
              url: 'http://live.ft.com/',
              submenu: null
            },
            {
              label: 'Share News Tips Securely',
              url: '/securedrop',
              disableTracking: true,
              submenu: null
            },
            {
              label: 'Individual Subscriptions',
              url: 'http://www.ft.com/products',
              submenu: null
            },
            {
              label: 'Group Subscriptions',
              url:
                'https://enterprise.ft.com/en-gb/services/group-subscriptions/group-contact-us/?segmentId=383c7f63-abf4-b62d-cb33-4c278e6fdf61&cpccampaign=B2B_link_ft.com_footer',
              submenu: null
            },
            {
              label: 'Republishing',
              url: 'https://enterprise.ft.com/en-gb/services/republishing/',
              submenu: null
            },
            {
              label: 'Contracts & Tenders',
              url: 'http://www.businessesforsale.com/ft2/notices',
              submenu: null
            }
          ],
          [
            {
              label: 'Executive Job Search',
              url: 'https://www.exec-appointments.com/',
              submenu: null
            },
            {
              label: 'Advertise with the FT',
              url: 'http://fttoolkit.co.uk/',
              submenu: null
            },
            {
              label: 'Follow the FT on Twitter',
              url: 'https://twitter.com/financialtimes',
              submenu: null
            },
            {
              label: 'FT Transact',
              url: 'https://transact.ft.com/en-gb/',
              submenu: null
            },
            {
              label: 'Secondary Schools',
              url: 'https://enterprise.ft.com/en-gb/services/group-subscriptions/education/',
              submenu: null
            }
          ]
        ]
      }
    },
    {
      label: 'Tools',
      url: null,
      submenu: {
        label: null,
        items: [
          [
            {
              label: 'Portfolio',
              url: 'https://markets.ft.com/data/portfolio/dashboard',
              submenu: null
            },
            {
              label: "Today's Newspaper (ePaper)",
              url: 'https://www.ft.com/todaysnewspaper',
              submenu: null
            },
            {
              label: 'Alerts Hub',
              url: 'http://markets.ft.com/data/alerts/',
              submenu: null
            },
            {
              label: 'Lexicon',
              url: 'http://lexicon.ft.com/',
              submenu: null
            },
            {
              label: 'MBA Rankings',
              url: 'http://rankings.ft.com/businessschoolrankings/global-mba-ranking-2016?ft_site=falcon',
              submenu: null
            }
          ],
          [
            {
              label: 'Economic Calendar',
              url: 'https://markets.ft.com/data/world/economic-calendar',
              submenu: null
            },
            {
              label: 'News feed',
              url: '/news-feed',
              submenu: null
            },
            {
              label: 'Newsletters',
              url: '/newsletters',
              submenu: null
            },
            {
              label: 'Currency Converter',
              url: 'https://markets.ft.com/research/Markets/Currencies?segid=70113',
              submenu: null
            }
          ]
        ]
      }
    }
  ]
}

export default data
