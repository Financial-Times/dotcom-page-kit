module.exports = {
  'drawer-uk': {
    label: 'Drawer',
    items: [
      {
        label: 'Top sections',
        url: null,
        submenu: {
          label: null,
          items: [
            { label: 'Home', url: '/', submenu: null },
            { label: 'Fake item', url: '/fake-item?location=${currentPath}', submenu: null },
            {
              label: 'World',
              url: '/world',
              submenu: {
                label: null,
                items: [
                  { label: 'Global Economy', url: '/global-economy', submenu: null },
                  {
                    label: 'UK',
                    url: '/world/uk',
                    submenu: {
                      label: null,
                      items: [
                        { label: 'UK Business & Economy', url: '/uk-business-economy', submenu: null },
                        { label: 'UK Politics & Policy', url: '/world/uk/politics', submenu: null },
                        { label: 'UK Companies', url: '/companies/uk', submenu: null },
                        {
                          label: 'Fake item nested',
                          url: '/fake-item-nested?location=${currentPath}',
                          submenu: null
                        }
                      ]
                    }
                  },
                  {
                    label: 'US',
                    url: '/world/us',
                    submenu: {
                      label: null,
                      items: [
                        { label: 'US Economy', url: '/us-economy', submenu: null },
                        { label: 'US Politics & Policy', url: '/world/us/politics', submenu: null },
                        { label: 'US Companies', url: '/companies/us', submenu: null }
                      ]
                    }
                  },
                  {
                    label: 'China',
                    url: '/world/asia-pacific/china',
                    submenu: {
                      label: null,
                      items: [
                        { label: 'Chinese Economy', url: '/chinese-economy', submenu: null },
                        {
                          label: 'China Politics & Policy',
                          url: '/chinese-politics-policy',
                          submenu: null
                        }
                      ]
                    }
                  },
                  { label: 'Africa', url: '/world/africa', submenu: null },
                  { label: 'Asia Pacific', url: '/world/asia-pacific', submenu: null },
                  { label: 'Emerging Markets', url: '/emerging-markets', submenu: null },
                  { label: 'Europe', url: '/world/europe', submenu: null },
                  { label: 'Americas', url: '/world/americas', submenu: null },
                  { label: 'Middle East and North Africa', url: '/world/mideast', submenu: null }
                ]
              }
            },
            {
              label: 'UK',
              url: '/world/uk',
              submenu: {
                label: null,
                items: [
                  { label: 'UK Business & Economy', url: '/uk-business-economy', submenu: null },
                  { label: 'UK Politics & Policy', url: '/world/uk/politics', submenu: null },
                  { label: 'UK Companies', url: '/companies/uk', submenu: null }
                ]
              }
            }
          ]
        }
      }
    ]
  }
}
